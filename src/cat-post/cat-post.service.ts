import { Injectable } from '@nestjs/common';
import { CatPostRepository } from './cat-post.repository';
import { CreatePostDto, UpdatePostDto } from './cat-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CatPostService {
  constructor(
    private readonly catPostRepository: CatPostRepository,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.catPostRepository.find({});
  }

  async createPost(userSeqNo: number, createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(userSeqNo);

    const newPost = this.catPostRepository.create({
      ...createPostDto,
      user,
    });

    return await this.catPostRepository.save(newPost);
  }

  async updatePost(seqNo: number, updatePostDto: UpdatePostDto) {
    const post = await this.catPostRepository.findOneOrFail({
      seqNo,
    });

    post.content = updatePostDto.content;
    post.imageUrl = updatePostDto.imageUrl;
    post.isPublished = updatePostDto.isPublished;

    return await this.catPostRepository.save(post);
  }

  async deletePost(seqNo: number) {
    await this.catPostRepository.delete({
      seqNo,
    });
  }
}
