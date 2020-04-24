import { Module } from '@nestjs/common';
import { CatPostController } from './cat-post.controller';
import { CatPostService } from './cat-post.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CatPostController],
  providers: [CatPostService],
})
export class CatPostModule {}
