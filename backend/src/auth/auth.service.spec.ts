import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    department: 'IT',
    emojiAvatar: '👤',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserForAuth', () => {
    it('should return user auth data when user exists', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserForAuth('1');

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        isAdmin: mockUser.isAdmin,
        emojiAvatar: mockUser.emojiAvatar,
        department: mockUser.department,
      });
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockUsersService.findOne.mockRejectedValue(new NotFoundException('User not found'));

      await expect(service.getUserForAuth('999')).rejects.toThrow(NotFoundException);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('999');
    });

    it('should handle user without optional fields', async () => {
      const userWithoutOptionalFields = {
        ...mockUser,
        department: null,
        emojiAvatar: null,
      };
      mockUsersService.findOne.mockResolvedValue(userWithoutOptionalFields);

      const result = await service.getUserForAuth('1');

      expect(result).toEqual({
        id: userWithoutOptionalFields.id,
        email: userWithoutOptionalFields.email,
        name: userWithoutOptionalFields.name,
        isAdmin: userWithoutOptionalFields.isAdmin,
        emojiAvatar: null,
        department: null,
      });
    });
  });

  describe('login', () => {
    it('should login existing user successfully', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'any-password',
      };

      mockUsersService.findAll.mockResolvedValue([mockUser]);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          isAdmin: mockUser.isAdmin,
          emojiAvatar: mockUser.emojiAvatar,
          department: mockUser.department,
        },
        isAuthenticated: true,
      });
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });

    it('should create new user when email does not exist', async () => {
      const loginDto: LoginDto = {
        email: 'newuser@example.com',
        password: 'any-password',
      };

      const newUser = {
        ...mockUser,
        id: '2',
        email: 'newuser@example.com',
        name: 'newuser',
      };

      mockUsersService.findAll.mockResolvedValue([mockUser]); // Existing users without the new email
      mockUsersService.create.mockResolvedValue(newUser);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          isAdmin: newUser.isAdmin,
          emojiAvatar: newUser.emojiAvatar,
          department: newUser.department,
        },
        isAuthenticated: true,
      });
      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        name: 'newuser',
      });
    });

    it('should extract username from email when creating new user', async () => {
      const loginDto: LoginDto = {
        email: 'john.doe@company.com',
        password: 'any-password',
      };

      const newUser = {
        ...mockUser,
        id: '3',
        email: 'john.doe@company.com',
        name: 'john.doe',
      };

      mockUsersService.findAll.mockResolvedValue([]); // No existing users
      mockUsersService.create.mockResolvedValue(newUser);

      const result = await service.login(loginDto);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'john.doe@company.com',
        name: 'john.doe',
      });
      expect(result.user.name).toBe('john.doe');
    });

    it('should handle login with empty user database', async () => {
      const loginDto: LoginDto = {
        email: 'first@example.com',
        password: 'password',
      };

      const newUser = {
        ...mockUser,
        email: 'first@example.com',
        name: 'first',
      };

      mockUsersService.findAll.mockResolvedValue([]);
      mockUsersService.create.mockResolvedValue(newUser);

      const result = await service.login(loginDto);

      expect(result.isAuthenticated).toBe(true);
      expect(result.user.email).toBe('first@example.com');
    });

    it('should be case sensitive when matching emails', async () => {
      const loginDto: LoginDto = {
        email: 'Test@Example.com',
        password: 'password',
      };

      const existingUser = {
        ...mockUser,
        email: 'test@example.com', // lowercase
      };

      mockUsersService.findAll.mockResolvedValue([existingUser]);
      mockUsersService.create.mockResolvedValue({
        ...mockUser,
        email: 'Test@Example.com',
        name: 'Test',
      });

      const result = await service.login(loginDto);

      // Should create new user because email case doesn't match
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(result.user.email).toBe('Test@Example.com');
    });
  });
});
