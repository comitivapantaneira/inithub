import { Test, TestingModule } from '@nestjs/testing';
import { InitiativesService } from './initiatives.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InitiativesService', () => {
  let service: InitiativesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitiativesService,
        {
          provide: PrismaService,
          useValue: {
            initiative: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            like: {
              findUnique: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
            comment: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InitiativesService>(InitiativesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});