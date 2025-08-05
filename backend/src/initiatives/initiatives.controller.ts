import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto, UpdateInitiativeDto, CreateCommentDto } from './dto';

@ApiTags('initiatives')
@Controller('initiatives')
export class InitiativesController {
  constructor(private initiativesService: InitiativesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create initiative' })
  create(@Body() createInitiativeDto: CreateInitiativeDto, @Request() req) {
    return this.initiativesService.create(createInitiativeDto, req.user.userId);
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update initiative' })
  update(@Param('id') id: string, @Body() updateInitiativeDto: UpdateInitiativeDto, @Request() req) {
    return this.initiativesService.update(id, updateInitiativeDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete initiative' })
  remove(@Param('id') id: string, @Request() req) {
    return this.initiativesService.remove(id, req.user.userId);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like on initiative' })
  toggleLike(@Param('id') id: string, @Request() req) {
    return this.initiativesService.toggleLike(id, req.user.userId);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment to initiative' })
  addComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.initiativesService.addComment(id, createCommentDto, req.user.userId);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve initiative (Admin only)' })
  approve(@Param('id') id: string) {
    return this.initiativesService.approve(id);
  }

  @Patch(':id/assign/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign initiative to user (Admin only)' })
  assign(@Param('id') id: string, @Param('userId') userId: string) {
    return this.initiativesService.assign(id, userId);
  }
}