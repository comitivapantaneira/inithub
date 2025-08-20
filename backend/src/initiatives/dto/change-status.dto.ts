import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InitiativeStatusDto } from './update-initiative.dto';

export class ChangeStatusDto {
  @ApiPropertyOptional({ enum: InitiativeStatusDto })
  @IsEnum(InitiativeStatusDto)
  @IsOptional()
  status?: InitiativeStatusDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedById?: string;
}
