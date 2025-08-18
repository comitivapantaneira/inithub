import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'User password – any value is accepted' })
  @IsOptional()
  @IsString()
  password?: string;
}
