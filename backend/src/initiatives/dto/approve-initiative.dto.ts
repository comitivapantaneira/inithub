import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveInitiativeDto {
  @ApiProperty({ description: 'User ID who will execute the initiative' })
  @IsString()
  @IsNotEmpty()
  assignedToId: string;

  @ApiProperty({ description: 'Admin user ID who is assigning' })
  @IsString()
  @IsNotEmpty()
  assignedById: string;
}
