import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InitiativesController } from './initiatives.controller';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto, CreateLikeDto, InitiativeStatusDto } from './dto';

describe('InitiativesController', () => {
  let controller: InitiativesController;
  let initiativesService: InitiativesService;

  const mockInitiative = {
    id: '1',
    title: 'Test Initiative',
    description: 'Test Description',
    authorId: 'user1',
    theme: 'Technology',
    context: 'Test Context',
    deliverable: 'Test Deliverable',
    evaluationCriteria: 'Test Criteria',
    status: 'PENDING',
    assignedToId: null,
    assignedById: null,
    assignedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockInitiativesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addLike: jest.fn(),
    removeLike: jest.fn(),
    addComment: jest.fn(),
    removeComment: jest.fn(),
    approve: jest.fn(),
    addUpdate: jest.fn(),
    updateUpdate: jest.fn(),
    removeUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitiativesController],
      providers: [
        {
          provide: InitiativesService,
          useValue: mockInitiativesService,
        },
      ],
    }).compile();

    controller = module.get<InitiativesController>(InitiativesController);
    initiativesService = module.get<InitiativesService>(InitiativesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockInitiativesService.create.mockResolvedValue(mockInitiative);

      const result = await controller.create(createInitiativeDto);

      expect(result).toEqual(mockInitiative);
      expect(mockInitiativesService.create).toHaveBeenCalledWith(createInitiativeDto);
    });

    it('should handle validation errors', async () => {
      const invalidDto = {} as CreateInitiativeDto;

      mockInitiativesService.create.mockRejectedValue(new Error('Validation failed'));

      await expect(controller.create(invalidDto)).rejects.toThrow('Validation failed');
      expect(mockInitiativesService.create).toHaveBeenCalledWith(invalidDto);
    });
  });

  describe('findAll', () => {
    it('should return all initiatives without filters', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll();

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: undefined,
        statuses: undefined,
        sort: undefined,
      });
    });

    it('should filter by categories', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll('Technology,Innovation');

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: ['Technology', 'Innovation'],
        statuses: undefined,
        sort: undefined,
      });
    });

    it('should filter by statuses', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll(undefined, 'PENDING,APPROVED');

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: undefined,
        statuses: ['PENDING', 'APPROVED'],
        sort: undefined,
      });
    });

    it('should apply sorting', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll(undefined, undefined, 'likes_desc');

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: undefined,
        statuses: undefined,
        sort: 'likes_desc',
      });
    });

    it('should handle empty filter strings', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll('', '');

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: undefined,
        statuses: undefined,
        sort: undefined,
      });
    });

    it('should filter out empty values in comma-separated strings', async () => {
      const initiatives = [mockInitiative];
      mockInitiativesService.findAll.mockResolvedValue(initiatives);

      const result = await controller.findAll('Technology,,Innovation,', 'PENDING,,APPROVED,');

      expect(result).toEqual(initiatives);
      expect(mockInitiativesService.findAll).toHaveBeenCalledWith({
        categories: ['Technology', 'Innovation'],
        statuses: ['PENDING', 'APPROVED'],
        sort: undefined,
      });
    });
  });

  describe('findOne', () => {
    it('should return an initiative when found', async () => {
      const initiativeWithDetails = {
        ...mockInitiative,
        author: { id: 'user1', name: 'Test User' },
        likes: [],
        comments: [],
        updates: [],
      };

      mockInitiativesService.findOne.mockResolvedValue(initiativeWithDetails);

      const result = await controller.findOne('1');

      expect(result).toEqual(initiativeWithDetails);
      expect(mockInitiativesService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when initiative not found', async () => {
      mockInitiativesService.findOne.mockRejectedValue(new NotFoundException('Initiative not found'));

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      expect(mockInitiativesService.findOne).toHaveBeenCalledWith('999');
    });
  });

  describe('update', () => {
    it('should update an initiative successfully', async () => {
      const updateInitiativeDto: UpdateInitiativeDto = {
        title: 'Updated Initiative',
        status: InitiativeStatusDto.IN_EXECUTION,
      };

      const updatedInitiative = { ...mockInitiative, ...updateInitiativeDto };
      mockInitiativesService.update.mockResolvedValue(updatedInitiative);

      const result = await controller.update('1', updateInitiativeDto);

      expect(result).toEqual(updatedInitiative);
      expect(mockInitiativesService.update).toHaveBeenCalledWith('1', updateInitiativeDto);
    });

    it('should handle partial updates', async () => {
      const updateInitiativeDto: UpdateInitiativeDto = {
        title: 'Updated Title Only',
      };

      const updatedInitiative = { ...mockInitiative, title: 'Updated Title Only' };
      mockInitiativesService.update.mockResolvedValue(updatedInitiative);

      const result = await controller.update('1', updateInitiativeDto);

      expect(result).toEqual(updatedInitiative);
      expect(mockInitiativesService.update).toHaveBeenCalledWith('1', updateInitiativeDto);
    });

    it('should throw error when initiative not found', async () => {
      const updateInitiativeDto: UpdateInitiativeDto = { title: 'Updated' };
      mockInitiativesService.update.mockRejectedValue(new NotFoundException('Initiative not found'));

      await expect(controller.update('999', updateInitiativeDto)).rejects.toThrow(NotFoundException);
      expect(mockInitiativesService.update).toHaveBeenCalledWith('999', updateInitiativeDto);
    });
  });

  describe('remove', () => {
    it('should delete an initiative successfully', async () => {
      mockInitiativesService.remove.mockResolvedValue(mockInitiative);

      const result = await controller.remove('1');

      expect(result).toEqual(mockInitiative);
      expect(mockInitiativesService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw error when initiative not found', async () => {
      mockInitiativesService.remove.mockRejectedValue(new NotFoundException('Initiative not found'));

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
      expect(mockInitiativesService.remove).toHaveBeenCalledWith('999');
    });
  });
});
