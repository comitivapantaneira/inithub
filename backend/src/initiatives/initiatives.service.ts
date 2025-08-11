import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto, CreateLikeDto, ApproveInitiativeDto, CreateInitiativeUpdateDto } from './dto';
import { EmbeddingsService } from '../embeddings/embeddings.service';

@Injectable()
export class InitiativesService {
  constructor(private prisma: PrismaService, private embeddings: EmbeddingsService) {}

  async create(data: CreateInitiativeDto) {
    const { ...rest } = data as any;
    const created = await this.prisma.initiative.create({
      data: {
        ...rest,
        assignedToId: undefined,
        assignedById: undefined,
        assignedAt: undefined,
      },
    });
    this.embeddings.generateAndStoreInitiativeEmbedding(created).catch(() => {
      // Swallow errors to avoid blocking the request path
    });

    return created;
  }

  async findAll() {
    return this.prisma.initiative.findMany({
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    });
  }

  async findOne(id: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: { id },
      include: {
        likes: true,
        comments: true,
        updates: { orderBy: { createdAt: 'desc' } },
      },
    });
    
    if (!initiative) throw new NotFoundException('Initiative not found');
    return initiative;
  }

  async update(id: string, data: UpdateInitiativeDto) {
    // Map DTO status to Prisma enum value if provided
    const { status, assignedAt, ...rest } = data as any;
    const payload: any = { ...rest };
    if (typeof assignedAt === 'string') {
      payload.assignedAt = new Date(assignedAt);
    }
    if (status) {
      // Prisma expects the generated enum type; using string is fine as long as it matches
      payload.status = status as any;
    }
    return this.prisma.initiative.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string) {
    return this.prisma.initiative.delete({ where: { id } });
  }

  async addLike(initiativeId: string, data: CreateLikeDto) {
    const { userId } = data;
    if (!userId) throw new BadRequestException('userId is required');
    return this.prisma.like.create({ data: { initiativeId, userId } });
  }

  async addComment(initiativeId: string, data: CreateCommentDto) {
    const { userId, content } = data;
    if (!userId) throw new BadRequestException('userId is required');
    return this.prisma.comment.create({
      data: { content, userId, initiativeId },
    });
  }

  async approve(id: string, data: ApproveInitiativeDto) {
    const { assignedToId, assignedById } = data;
    if (!assignedToId || !assignedById) throw new BadRequestException('assignedToId and assignedById are required');
    return this.prisma.initiative.update({
      where: { id },
      data: {
        status: 'IN_EXECUTION' as any,
        assignedToId,
        assignedById,
        assignedAt: new Date(),
      },
    });
  }

  async addUpdate(initiativeId: string, data: CreateInitiativeUpdateDto) {
    const { authorId, content } = data;
    if (!authorId || !content) throw new BadRequestException('authorId and content are required');
    return this.prisma.initiativeUpdate.create({
      data: { initiativeId, authorId, content },
    });
  }
}