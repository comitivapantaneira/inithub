
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, UserAuthDto, LoginResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async getUserForAuth(userId: string): Promise<UserAuthDto> {
    const user = await this.usersService.findOne(userId);
    
    const result = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      emojiAvatar: user.emojiAvatar,
      department: user.department,
    };

    return result;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // MVP: accept any password, only require email exists in DB
    const { email } = loginDto;

    // Nao criei um findByEmail
    const users = await this.usersService.findAll();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // For MVP we can create the user on-the-fly with a placeholder name if not found
      const created = await this.usersService.create({ 
        email, 
        name: email.split('@')[0] 
      });
      return {
        user: {
          id: created.id,
          email: created.email,
          name: created.name,
          isAdmin: created.isAdmin,
          emojiAvatar: created.emojiAvatar,
          department: created.department,
        },
        isAuthenticated: true,
      };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        emojiAvatar: user.emojiAvatar,
        department: user.department,
      },
      isAuthenticated: true,
    };
  }
}