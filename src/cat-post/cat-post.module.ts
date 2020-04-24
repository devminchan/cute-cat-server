import { Module, HttpModule } from '@nestjs/common';
import { CatPostController } from './cat-post.controller';
import { CatPostService } from './cat-post.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatPostRepository } from './cat-post.repository';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatPostRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule,
    UtilsModule,
    HttpModule,
  ],
  controllers: [CatPostController],
  providers: [CatPostService],
})
export class CatPostModule {}
