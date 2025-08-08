import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto } from './dto';

@Injectable()
export class InitiativesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInitiativeDto) {
    return this.prisma.initiative.create({
      data,
    });
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
      },
    });
    
    if (!initiative) throw new NotFoundException('Initiative not found');
    return initiative;
  }

  async update(id: string, data: UpdateInitiativeDto) {
    return this.prisma.initiative.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.initiative.delete({ where: { id } });
  }

  async addLike(initiativeId: string) {
    return this.prisma.like.create({ data: { initiativeId } });
  }

  async addComment(initiativeId: string, data: CreateCommentDto) {
    return this.prisma.comment.create({
      data: { ...data, initiativeId },
    });
  }

  async approve(id: string) {
    return this.prisma.initiative.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }
}