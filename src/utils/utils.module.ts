import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyValueRepository } from './keyvalue.repsitory';
import { UtilsController } from './utils.controller';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

@Module({
  imports: [
    TypeOrmModule.forFeature([KeyValueRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MulterModule.register({
      storage: multerS3({
        s3,
        bucket: 'cute-cat-bucket-2',
        metadata: function(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, Date.now().toString() + ext);
        },
      }),
    }),
  ],
  providers: [UtilsService],
  exports: [UtilsService],
  controllers: [UtilsController],
})
export class UtilsModule {}
