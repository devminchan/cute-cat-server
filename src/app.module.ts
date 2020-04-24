import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CatPostModule } from './cat-post/cat-post.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, CatPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
