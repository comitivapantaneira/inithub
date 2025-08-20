import { PartialType } from '@nestjs/swagger';
import { CreateInitiativeDto } from './create-initiative.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum InitiativeStatusDto {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  IN_EXECUTION = 'IN_EXECUTION',
  COMPLETED = 'COMPLETED',
}

export class UpdateInitiativeDto extends PartialType(CreateInitiativeDto) {
  @ApiPropertyOptional({ enum: InitiativeStatusDto })
  @IsEnum(InitiativeStatusDto)
  @IsOptional()
  status?: InitiativeStatusDto;

  // Assignment fields (manager will set later)
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedById?: string;

  @ApiPropertyOptional({ description: 'ISO date string' })
  @IsString()
  @IsOptional()
  assignedAt?: string;
}