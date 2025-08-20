import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty({ required: false })
  emojiAvatar?: string;

  @ApiProperty({ required: false })
  department?: string;
}

export class LoginResponseDto {
  @ApiProperty()
  user: UserAuthDto;

  @ApiProperty({ default: true })
  isAuthenticated: boolean;
}
