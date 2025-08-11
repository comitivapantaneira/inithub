import { Module } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { InitiativesController } from './initiatives.controller';
import { EmbeddingsModule } from '../embeddings/embeddings.module';

@Module({
  imports: [EmbeddingsModule],
  providers: [InitiativesService],
  controllers: [InitiativesController],
})
export class InitiativesModule {}