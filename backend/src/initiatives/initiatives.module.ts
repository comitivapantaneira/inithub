import { Module } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { InitiativesController } from './initiatives.controller';

@Module({
  providers: [InitiativesService],
  controllers: [InitiativesController],
})
export class InitiativesModule {}