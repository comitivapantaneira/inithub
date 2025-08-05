import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto } from './dto';

@ApiTags('initiatives')
@Controller('initiatives')
export class InitiativesController {
  constructor(private initiativesService: InitiativesService) {}

  @Post()
  @ApiOperation({ summary: 'Create initiative' })
  create(@Body() createInitiativeDto: CreateInitiativeDto) {
    return this.initiativesService.create(createInitiativeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all initiatives' })
  findAll() {
    return this.initiativesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get initiative by id' })
  findOne(@Param('id') id: string) {
    return this.initiativesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update initiative' })
  update(@Param('id') id: string, @Body() updateInitiativeDto: UpdateInitiativeDto) {
    return this.initiativesService.update(id, updateInitiativeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete initiative' })
  remove(@Param('id') id: string) {
    return this.initiativesService.remove(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Add like to initiative' })
  addLike(@Param('id') id: string) {
    return this.initiativesService.addLike(id);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Add comment to initiative' })
  addComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.initiativesService.addComment(id, createCommentDto);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve initiative' })
  approve(@Param('id') id: string) {
    return this.initiativesService.approve(id);
  }
}