import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmbeddingsService } from './embeddings.service';
import { SearchSimilarDto } from './dto/search-similar.dto';

@ApiTags('embeddings')
@Controller('embeddings')
export class EmbeddingsController {
  constructor(private readonly embeddings: EmbeddingsService) {}

  @Post('similar')
  @ApiOperation({ summary: 'Find similar initiatives by text (pgvector)' })
  async similar(@Body() dto: SearchSimilarDto) {
    const limit = dto.limit ?? 10;
    return this.embeddings.searchSimilarInitiatives(dto.text, limit);
  }
}
