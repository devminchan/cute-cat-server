import {
  Controller,
  Request,
  Body,
  UseGuards,
  Post,
  Get,
} from '@nestjs/common';
import { CatPostService } from './cat-post.service';
import { CreatePostDto } from './cat-post.dto';
import { AuthGuard } from '@nestjs/passport';

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
}
