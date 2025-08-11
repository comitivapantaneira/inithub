import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({ description: 'User who liked the initiative' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
