import { Controller, Request, Body, UseGuards, Post } from '@nestjs/common';
import { CatPostService } from './cat-post.service';
import { CreatePostDto } from './cat-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cat-posts')
export class CatPostController {
  constructor(private readonly catPostService: CatPostService) {}

  @UseGuards(AuthGuard())
  @Post()
  async createNewPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    try {
      return this.catPostService.createPost(req.user.seqNo, createPostDto);
    } catch (e) {
      throw e;
    }
  }
}
