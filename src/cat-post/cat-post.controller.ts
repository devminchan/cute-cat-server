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
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CatPost } from './cat-post.entity';

@ApiTags('cat-posts')
@Controller('cat-posts')
export class CatPostController {
  constructor(private readonly catPostService: CatPostService) {}

  @ApiOperation({
    description: '모든 게시물 조회',
  })
  @ApiResponse({
    description: '게시물 리스트 응답',
    type: [CatPost],
  })
  @Get()
  async getAllPosts() {
    try {
      return await this.catPostService.findAll();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @ApiOperation({
    description: '게시물 생성 (요청시 저장된 이미지 url, 게시물 내용 전달)',
  })
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

  @ApiOperation({
    description: '게시물 수정',
  })
  @UseGuards(AuthGuard())
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

  @ApiOperation({
    description: '게시물 삭제',
  })
  @UseGuards(AuthGuard())
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

  @ApiOperation({
    description: '페이스북 페이지에 seqNo에 해당하는 게시물 업로드 (어드민 권한 필요)',
  })
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
