import {
  Controller,
  Request,
  Body,
  UseGuards,
  Post,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatPostService } from './cat-post.service';
import { CreatePostDto, UpdatePostDto } from './cat-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

@Controller('cat-posts')
export class CatPostController {
  constructor(private readonly catPostService: CatPostService) {}

  @Get()
  async getAllPosts() {
    try {
      return await this.catPostService.findAll();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard())
  @Post()
  async createNewPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    try {
      return this.catPostService.createPost(req.user.seqNo, createPostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard(), AdminGuard)
  @Patch('/:seqNo')
  async updatePost(
    @Param('seqNo') seqNo: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return this.catPostService.updatePost(seqNo, updatePostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard(), AdminGuard)
  @Delete('/:seqNo')
  async deletePost(@Param('seqNo') seqNo: number) {
    try {
      this.catPostService.deletePost(seqNo);

      return {
        statusCode: 200,
        message: 'success',
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard(), AdminGuard)
  @Patch('/:seqNo/publish')
  async publishPost(@Param('seqNo') seqNo: number) {
    try {
      return this.catPostService.publishPost(seqNo);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
