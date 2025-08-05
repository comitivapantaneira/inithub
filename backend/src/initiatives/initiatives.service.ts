import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto } from './dto';

@Injectable()
export class InitiativesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInitiativeDto, authorId: string) {
    return this.prisma.initiative.create({
      data: { ...data, authorId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findAll() {
    return this.prisma.initiative.findMany({
      include: {
        author: { select: { id: true, name: true, email: true } },
        _count: { select: { likes: true, comments: true } },
      },
    });
  }

  async findOne(id: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
        likes: { include: { user: { select: { id: true, name: true } } } },
        comments: { include: { user: { select: { id: true, name: true } } } },
      },
    });
    
    if (!initiative) throw new NotFoundException('Initiative not found');
    return initiative;
  }

  async update(id: string, data: UpdateInitiativeDto, userId: string) {
    const initiative = await this.findOne(id);
    if (initiative.authorId !== userId) {
      throw new ForbiddenException('Only author can update initiative');
    }
    
    return this.prisma.initiative.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async remove(id: string, userId: string) {
    const initiative = await this.findOne(id);
    if (initiative.authorId !== userId) {
      throw new ForbiddenException('Only author can delete initiative');
    }
    
    return this.prisma.initiative.delete({ where: { id } });
  }

  async toggleLike(initiativeId: string, userId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_initiativeId: { userId, initiativeId } },
    });

    if (existing) {
      await this.prisma.like.delete({ where: { id: existing.id } });
      return { liked: false };
    } else {
      await this.prisma.like.create({ data: { userId, initiativeId } });
      return { liked: true };
    }
  }

  async addComment(initiativeId: string, data: CreateCommentDto, userId: string) {
    return this.prisma.comment.create({
      data: { ...data, initiativeId, userId },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async approve(id: string) {
    return this.prisma.initiative.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  async assign(id: string, assignedToId: string) {
    return this.prisma.initiative.update({
      where: { id },
      data: { assignedToId },
      include: { assignedTo: { select: { id: true, name: true, email: true } } },
    });
  }
}