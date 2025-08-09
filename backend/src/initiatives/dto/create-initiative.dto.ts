import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInitiativeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Original initiative creator' })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  context: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deliverable: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  evaluationCriteria: string;
}