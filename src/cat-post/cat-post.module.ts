import { Module } from '@nestjs/common';
import { CatPostController } from './cat-post.controller';
import { CatPostService } from './cat-post.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatPostRepository } from './cat-post.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatPostRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule,
  ],
  controllers: [CatPostController],
  providers: [CatPostService],
})
export class CatPostModule {}
