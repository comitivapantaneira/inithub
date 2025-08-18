import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto, CreateLikeDto, ApproveInitiativeDto, CreateInitiativeUpdateDto, UpdateInitiativeUpdateDto } from './dto';

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
  findAll(
    @Query('categories') categories?: string,
    @Query('statuses') statuses?: string,
    @Query('sort') sort?: string,
  ) {
    const categoriesArr = categories ? categories.split(',').filter(Boolean) : undefined;
    const statusesArr = statuses ? statuses.split(',').filter(Boolean) : undefined;

    return this.initiativesService.findAll({
      categories: categoriesArr,
      statuses: statusesArr,
      sort,
    });
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
  addLike(@Param('id') id: string, @Body() dto: CreateLikeDto) {
    return this.initiativesService.addLike(id, dto);
  }

  @Delete(':id/like')
  @ApiOperation({ summary: 'Remove like from initiative' })
  @ApiQuery({ name: 'userId', required: true, description: 'User who is removing the like (userId)' })
  removeLike(@Param('id') id: string, @Query('userId') userId: string) {
    return this.initiativesService.removeLike(id, userId);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Add comment to initiative' })
  addComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.initiativesService.addComment(id, createCommentDto);
  }

  @Delete(':id/comments/:commentId')
  @ApiOperation({ summary: 'Remove comment from initiative' })
  @ApiQuery({ name: 'userId', required: true, description: 'User who requests deletion of the comment (userId)' })
  removeComment(@Param('id') id: string, @Param('commentId') commentId: string, @Query('userId') userId: string) {
    return this.initiativesService.removeComment(id, commentId, userId);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve and assign initiative' })
  approve(
    @Param('id') id: string,
    @Body() dto: ApproveInitiativeDto,
  ) {
    return this.initiativesService.approve(id, dto);
  }

  @Post(':id/updates')
  @ApiOperation({ summary: 'Add execution update to initiative' })
  addUpdate(
    @Param('id') id: string,
    @Body() dto: CreateInitiativeUpdateDto,
  ) {
    return this.initiativesService.addUpdate(id, dto);
  }

  @Patch('updates/:updateId')
  @ApiOperation({ summary: 'Update an initiative update' })
  updateUpdate(
    @Param('updateId') updateId: string,
    @Body() dto: UpdateInitiativeUpdateDto,
  ) {
    return this.initiativesService.updateUpdate(updateId, dto);
  }

  @Delete('updates/:updateId')
  @ApiOperation({ summary: 'Delete an initiative update' })
  deleteUpdate(@Param('updateId') updateId: string) {
    return this.initiativesService.deleteUpdate(updateId);
  }

  @Get('user/:userId/authored')
  @ApiOperation({ summary: 'Get initiatives created by user' })
  findByAuthor(@Param('userId') userId: string) {
    return this.initiativesService.findByAuthor(userId);
  }

  @Get('user/:userId/assigned')
  @ApiOperation({ summary: 'Get initiatives assigned to user' })
  findByAssignedTo(@Param('userId') userId: string) {
    return this.initiativesService.findByAssignedTo(userId);
  }
}