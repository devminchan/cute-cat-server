import { Injectable } from '@nestjs/common';
import { CatPostRepository } from './cat-post.repository';
import { CreatePostDto } from './cat-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CatPostService {
  constructor(
    private readonly catPostRepository: CatPostRepository,
    private readonly userService: UserService,
  ) {}

  async createPost(userSeqNo: number, createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(userSeqNo);

    const newPost = this.catPostRepository.create({
      ...createPostDto,
      user,
    });

    return await this.catPostRepository.save(newPost);
  }
}
