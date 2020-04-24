import { Module } from '@nestjs/common';
import { CatPostController } from './cat-post.controller';
import { CatPostService } from './cat-post.service';

@Module({
  controllers: [CatPostController],
  providers: [CatPostService]
})
export class CatPostModule {}
