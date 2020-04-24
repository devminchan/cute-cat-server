import { Injectable, HttpService } from '@nestjs/common';
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

  async updatePost(seqNo: number, updatePostDto: UpdatePostDto) {
    const post = await this.catPostRepository.findOneOrFail({
      seqNo,
    });

    post.content = updatePostDto.content;
    post.imageUrl = updatePostDto.imageUrl;

    return await this.catPostRepository.save(post);
  }

  async deletePost(seqNo: number) {
    await this.catPostRepository.delete({
      seqNo,
    });
  }

  async publishPost(seqNo: number) {
    const catPost = await this.catPostRepository.findOneOrFail(seqNo);
    const accessToken = await this.utilsService.getValueByKey(
      'facebook-page-token',
    );

    const graphUrl = 'https://graph.facebook.com/';

    console.log('image url', catPost.imageUrl);
    console.log('content', catPost.content);
    console.log('token', accessToken);

    const result = await this.http
      .post(
        `${graphUrl}me/photos?access_token=${accessToken}&url=${catPost.imageUrl}&message=${catPost.content}`,
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
