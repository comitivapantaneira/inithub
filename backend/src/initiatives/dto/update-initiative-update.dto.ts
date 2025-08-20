import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInitiativeUpdateDto {
  @ApiProperty({ description: 'Update content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Whether the update is completed', required: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
