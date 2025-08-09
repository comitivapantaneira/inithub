import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInitiativeUpdateDto {
  @ApiProperty({ description: 'Author user ID (responsible for the initiative execution)' })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({ description: 'Update content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
