import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InitiativesModule } from './initiatives/initiatives.module';

@Module({
  imports: [PrismaModule, InitiativesModule],
})
export class AppModule {}