import {
  Injectable,
  HttpService,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CatPostRepository } from './cat-post.repository';
import { CreatePostDto, UpdatePostDto } from './cat-post.dto';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class CatPostService {
  constructor(
    private readonly catPostRepository: CatPostRepository,
    private readonly userService: UserService,
    private readonly utilsService: UtilsService,
    private readonly http: HttpService,
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

  async updatePost(
    userSeqNo: number,
    seqNo: number,
    updatePostDto: UpdatePostDto,
  ) {
    const post = await this.catPostRepository.findOne({
      seqNo,
      user: {
        seqNo: userSeqNo,
      },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    if (updatePostDto.content && updatePostDto.content.length > 0) {
      post.content = updatePostDto.content;
    }

    if (updatePostDto.imageUrl && updatePostDto.imageUrl.length > 0) {
      post.imageUrl = updatePostDto.imageUrl;
    }

    return await this.catPostRepository.save(post);
  }

  async deletePost(userSeqNo: number, seqNo: number) {
    const result = await this.catPostRepository.delete({
      seqNo,
      user: {
        seqNo: userSeqNo,
      },
    });

    if (result.affected <= 0) {
      throw new BadRequestException('nothing is deleted');
    }
  }

  async publishPost(seqNo: number) {
    const catPost = await this.catPostRepository.findOne({ seqNo });

    if (!catPost) {
      throw new NotFoundException('post not found');
    }

    const accessToken = await this.utilsService.getValueByKey(
      'facebook-page-token',
    );

    if (catPost.postUrl) {
      throw new BadRequestException('the post is already published!');
    }

    const graphUrl = 'https://graph.facebook.com/';

    // 한글 때문에 request 시 오류 발생함
    const hangulEncoded = encodeURI(catPost.content);

    const result = await this.http
      .post(
        `${graphUrl}me/photos?access_token=${accessToken}&url=${catPost.imageUrl}&message=${hangulEncoded}`,
      )
      .toPromise();

    const postId = result.data['post_id'];

    const postUrlResult = await this.http
      .get(
        `${graphUrl}/${postId}?access_token=${accessToken}&fields=permalink_url`,
      )
      .toPromise();

    const postUrl = postUrlResult.data['permalink_url'];

    catPost.postUrl = postUrl;

    return await this.catPostRepository.save(catPost);
  }
}
