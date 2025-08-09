import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchSimilarDto {
  @ApiProperty({ description: 'Text to embed and search by' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false, description: 'Max results to return', default: 10 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
