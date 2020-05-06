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
  Req,
} from '@nestjs/common';
import { CatPostService } from './cat-post.service';
import { CreatePostDto, UpdatePostDto } from './cat-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation, ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { CatPost } from './cat-post.entity';
import { DefaultApiResponse } from '../utils/utils.type';

@ApiTags('cat-posts')
@Controller('cat-posts')
export class CatPostController {
  constructor(private readonly catPostService: CatPostService) {}

  @ApiOperation({
    description: '모든 게시물 조회',
  })
  @ApiResponse({
    status: 200,
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

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '게시물 생성 (요청시 저장된 이미지 url, 게시물 내용 전달)',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 게시물 응답',
    type: CatPost,
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

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '게시물 수정',
  })
  @ApiResponse({
    status: 200,
    description: '수정된 게시물 응답',
    type: CatPost,
  })
  @UseGuards(AuthGuard())
  @Patch('/:seqNo')
  async updatePost(
    @Req() req,
    @Param('seqNo') seqNo: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return this.catPostService.updatePost(req.user.seqNo, seqNo, updatePostDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '게시물 삭제',
  })
  @ApiResponse({
    status: 200,
    type: DefaultApiResponse,
  })
  @UseGuards(AuthGuard())
  @Delete('/:seqNo')
  async deletePost(@Req() req, @Param('seqNo') seqNo: number) {
    try {
      this.catPostService.deletePost(req.user.seqNo, seqNo);

      return {
        statusCode: 200,
        message: 'success',
      } as DefaultApiResponse;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description:
      '페이스북 페이지에 seqNo에 해당하는 게시물 업로드 (어드민 권한 필요)',
  })
  @ApiResponse({
    status: 200,
    description: '페이지에 업로드후 postUrl이 변경된 게시물 응답',
    type: CatPost,
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
