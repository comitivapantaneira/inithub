import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { EmbeddingsController } from './embeddings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmbeddingsService],
  controllers: [EmbeddingsController],
  exports: [EmbeddingsService],
})
export class EmbeddingsModule {}
