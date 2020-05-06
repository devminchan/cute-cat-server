import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { CatPostRepository } from './cat-post.repository';
import { CreatePostDto, UpdatePostDto } from './cat-post.dto';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';

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
    const post = await this.catPostRepository.findOneOrFail({
      seqNo,
      user: {
        seqNo: userSeqNo,
      },
    });

    post.content = updatePostDto.content || post.content;
    post.imageUrl = updatePostDto.imageUrl || post.imageUrl;

    return await this.catPostRepository.save(post);
  }

  async deletePost(userSeqNo: number, seqNo: number) {
    await this.catPostRepository.delete({
      seqNo,
      user: {
        seqNo: userSeqNo,
      },
    });
  }

  async publishPost(seqNo: number) {
    const catPost = await this.catPostRepository.findOneOrFail(seqNo);
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
