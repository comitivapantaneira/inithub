import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { CreateInitiativeDto, CreateCommentDto, CreateLikeDto, ApproveInitiativeDto, UpdateInitiativeDto, InitiativeStatusDto } from './dto';

describe('InitiativesService', () => {
  let service: InitiativesService;
  let prismaService: PrismaService;
  let embeddingsService: EmbeddingsService;

  const mockPrismaService = {
    initiative: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    like: {
      create: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    comment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockEmbeddingsService = {
    generateAndStoreInitiativeEmbedding: jest.fn(),
  };

  const mockInitiative = {
    id: '1',
    title: 'Test Initiative',
    description: 'Test Description',
    authorId: 'user1',
    theme: 'Technology',
    context: 'Test Context',
    goals: 'Test Goals',
    resources: 'Test Resources',
    impact: 'Test Impact',
    status: 'PENDING',
    assignedToId: null,
    assignedById: null,
    assignedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUser = {
    id: 'user1',
    name: 'Test User',
    emojiAvatar: '👤',
    department: 'IT',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitiativesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: EmbeddingsService,
          useValue: mockEmbeddingsService,
        },
      ],
    }).compile();

    service = module.get<InitiativesService>(InitiativesService);
    prismaService = module.get<PrismaService>(PrismaService);
    embeddingsService = module.get<EmbeddingsService>(EmbeddingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new initiative', async () => {
      const createInitiativeDto: CreateInitiativeDto = {
        title: 'Test Initiative',
        description: 'Test Description',
        authorId: 'user1',
        theme: 'Technology',
        context: 'Test Context',
        deliverable: 'Test Deliverable',
        evaluationCriteria: 'Test Criteria',
      };

      mockPrismaService.initiative.create.mockResolvedValue(mockInitiative);
      mockEmbeddingsService.generateAndStoreInitiativeEmbedding.mockResolvedValue(undefined);

      const result = await service.create(createInitiativeDto);

      expect(result).toEqual(mockInitiative);
      expect(mockPrismaService.initiative.create).toHaveBeenCalledWith({
        data: {
          ...createInitiativeDto,
          assignedToId: undefined,
          assignedById: undefined,
          assignedAt: undefined,
        },
      });
      expect(mockEmbeddingsService.generateAndStoreInitiativeEmbedding).toHaveBeenCalledWith(mockInitiative);
    });

    it('should handle embedding generation errors gracefully', async () => {
      const createInitiativeDto: CreateInitiativeDto = {
        title: 'Test Initiative',
        description: 'Test Description',
        authorId: 'user1',
        theme: 'Technology',
        context: 'Test Context',
        deliverable: 'Test Deliverable',
        evaluationCriteria: 'Test Criteria',
      };

      mockPrismaService.initiative.create.mockResolvedValue(mockInitiative);
      mockEmbeddingsService.generateAndStoreInitiativeEmbedding.mockRejectedValue(new Error('Embedding failed'));

      const result = await service.create(createInitiativeDto);

      expect(result).toEqual(mockInitiative);
      expect(mockPrismaService.initiative.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all initiatives without filters', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll();

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
    });

    it('should filter by categories', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll({ categories: ['Technology'] });

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ theme: { contains: 'Technology', mode: 'insensitive' } }],
        },
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
    });

    it('should filter by statuses', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll({ statuses: ['PENDING', 'APPROVED'] });

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {
          status: { in: ['PENDING', 'APPROVED'] },
        },
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
    });

    it('should sort by likes descending', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll({ sort: 'likes_desc' });

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { likes: { _count: 'desc' } },
        include: expect.any(Object),
      });
    });

    it('should sort by creation date ascending', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll({ sort: 'createdAt_asc' });

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'asc' },
        include: expect.any(Object),
      });
    });

    it('should combine multiple filters', async () => {
      const initiatives = [mockInitiative];
      mockPrismaService.initiative.findMany.mockResolvedValue(initiatives);

      const result = await service.findAll({
        categories: ['Technology', 'Innovation'],
        statuses: ['PENDING'],
        sort: 'likes_desc',
      });

      expect(result).toEqual(initiatives);
      expect(mockPrismaService.initiative.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { theme: { contains: 'Technology', mode: 'insensitive' } },
            { theme: { contains: 'Innovation', mode: 'insensitive' } },
          ],
          status: { in: ['PENDING'] },
        },
        orderBy: { likes: { _count: 'desc' } },
        include: expect.any(Object),
      });
    });
  });

  describe('findOne', () => {
    it('should return an initiative when found', async () => {
      const initiativeWithDetails = {
        ...mockInitiative,
        author: mockUser,
        likes: [],
        comments: [],
        updates: [],
        assignedTo: null,
        assignedBy: null,
      };

      mockPrismaService.initiative.findUnique.mockResolvedValue(initiativeWithDetails);

      const result = await service.findOne('1');

      expect(result).toEqual(initiativeWithDetails);
      expect(mockPrismaService.initiative.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          likes: true,
          comments: {
            include: {
              user: true,
            },
          },
          updates: {
            orderBy: { createdAt: 'desc' },
            include: {
              author: true,
            },
          },
          author: true,
          assignedTo: true,
          assignedBy: true,
        },
      });
    });

    it('should throw NotFoundException when initiative not found', async () => {
      mockPrismaService.initiative.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow('Initiative not found');
    });
  });

  describe('update', () => {
    it('should update an initiative', async () => {
      const updateData: UpdateInitiativeDto = {
        title: 'Updated Title',
        status: InitiativeStatusDto.IN_EXECUTION,
      };

      const updatedInitiative = { ...mockInitiative, ...updateData };
      mockPrismaService.initiative.update.mockResolvedValue(updatedInitiative);

      const result = await service.update('1', updateData);

      expect(result).toEqual(updatedInitiative);
      expect(mockPrismaService.initiative.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });

    it('should handle assignedAt date conversion', async () => {
      const updateData = {
        assignedAt: '2023-01-01T00:00:00.000Z',
      };

      const updatedInitiative = { ...mockInitiative, assignedAt: new Date('2023-01-01T00:00:00.000Z') };
      mockPrismaService.initiative.update.mockResolvedValue(updatedInitiative);

      const result = await service.update('1', updateData);

      expect(mockPrismaService.initiative.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          assignedAt: new Date('2023-01-01T00:00:00.000Z'),
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete an initiative', async () => {
      mockPrismaService.initiative.delete.mockResolvedValue(mockInitiative);

      const result = await service.remove('1');

      expect(result).toEqual(mockInitiative);
      expect(mockPrismaService.initiative.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('addLike', () => {
    it('should add a like to an initiative', async () => {
      const createLikeDto: CreateLikeDto = {
        userId: 'user1',
      };

      const mockLike = {
        id: 'like1',
        initiativeId: '1',
        userId: 'user1',
        createdAt: new Date(),
      };

      mockPrismaService.like.create.mockResolvedValue(mockLike);

      const result = await service.addLike('1', createLikeDto);

      expect(result).toEqual(mockLike);
      expect(mockPrismaService.like.create).toHaveBeenCalledWith({
        data: { initiativeId: '1', userId: 'user1' },
      });
    });

    it('should throw BadRequestException when userId is missing', async () => {
      const createLikeDto = { userId: undefined } as any;

      await expect(service.addLike('1', createLikeDto)).rejects.toThrow(BadRequestException);
      await expect(service.addLike('1', createLikeDto)).rejects.toThrow('userId is required');
    });
  });

  describe('removeLike', () => {
    it('should remove a like from an initiative', async () => {
      const mockLike = {
        id: 'like1',
        initiativeId: '1',
        userId: 'user1',
        createdAt: new Date(),
      };

      mockPrismaService.like.findFirst.mockResolvedValue(mockLike);
      mockPrismaService.like.delete.mockResolvedValue(mockLike);

      const result = await service.removeLike('1', 'user1');

      expect(result).toEqual(mockLike);
      expect(mockPrismaService.like.findFirst).toHaveBeenCalledWith({
        where: { initiativeId: '1', userId: 'user1' },
      });
      expect(mockPrismaService.like.delete).toHaveBeenCalledWith({
        where: { id: 'like1' },
      });
    });

    it('should throw NotFoundException when like not found', async () => {
      mockPrismaService.like.findFirst.mockResolvedValue(null);

      await expect(service.removeLike('1', 'user1')).rejects.toThrow(NotFoundException);
      await expect(service.removeLike('1', 'user1')).rejects.toThrow('Like not found');
    });

    it('should throw BadRequestException when userId is missing', async () => {
      await expect(service.removeLike('1', undefined as any)).rejects.toThrow(BadRequestException);
      await expect(service.removeLike('1', undefined as any)).rejects.toThrow('userId is required');
    });
  });

  describe('addComment', () => {
    it('should add a comment to an initiative', async () => {
      const createCommentDto: CreateCommentDto = {
        userId: 'user1',
        content: 'Great initiative!',
      };

      const mockComment = {
        id: 'comment1',
        content: 'Great initiative!',
        userId: 'user1',
        initiativeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.comment.create.mockResolvedValue(mockComment);

      const result = await service.addComment('1', createCommentDto);

      expect(result).toEqual(mockComment);
      expect(mockPrismaService.comment.create).toHaveBeenCalledWith({
        data: {
          content: 'Great initiative!',
          userId: 'user1',
          initiativeId: '1',
        },
      });
    });

    it('should throw BadRequestException when userId is missing', async () => {
      const createCommentDto = { content: 'Test', userId: undefined } as any;

      await expect(service.addComment('1', createCommentDto)).rejects.toThrow(BadRequestException);
      await expect(service.addComment('1', createCommentDto)).rejects.toThrow('userId is required');
    });
  });

  describe('removeComment', () => {
    it('should remove a comment from an initiative', async () => {
      const mockComment = {
        id: 'comment1',
        content: 'Test comment',
        userId: 'user1',
        initiativeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.comment.findUnique.mockResolvedValue(mockComment);
      mockPrismaService.comment.delete.mockResolvedValue(mockComment);

      const result = await service.removeComment('1', 'comment1', 'user1');

      expect(result).toEqual(mockComment);
      expect(mockPrismaService.comment.findUnique).toHaveBeenCalledWith({
        where: { id: 'comment1' },
      });
      expect(mockPrismaService.comment.delete).toHaveBeenCalledWith({
        where: { id: 'comment1' },
      });
    });

    it('should throw NotFoundException when comment not found', async () => {
      mockPrismaService.comment.findUnique.mockResolvedValue(null);

      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow(NotFoundException);
      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow('Comment not found');
    });

    it('should throw BadRequestException when comment does not belong to initiative', async () => {
      const mockComment = {
        id: 'comment1',
        content: 'Test comment',
        userId: 'user1',
        initiativeId: '2', // Different initiative
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.comment.findUnique.mockResolvedValue(mockComment);

      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow(BadRequestException);
      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow('Comment does not belong to initiative');
    });

    it('should throw BadRequestException when user is not comment owner', async () => {
      const mockComment = {
        id: 'comment1',
        content: 'Test comment',
        userId: 'user2', // Different user
        initiativeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.comment.findUnique.mockResolvedValue(mockComment);

      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow(BadRequestException);
      await expect(service.removeComment('1', 'comment1', 'user1')).rejects.toThrow('Only the comment owner can delete the comment');
    });

    it('should throw BadRequestException when userId is missing', async () => {
      await expect(service.removeComment('1', 'comment1', undefined as any)).rejects.toThrow(BadRequestException);
      await expect(service.removeComment('1', 'comment1', undefined as any)).rejects.toThrow('userId is required');
    });
  });
});
