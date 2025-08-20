import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { UsersModule } from './users/users.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, InitiativesModule, UsersModule, EmbeddingsModule, AuthModule],
})
export class AppModule {}