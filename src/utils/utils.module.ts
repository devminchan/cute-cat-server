import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyValueRepository } from './keyvalue.repsitory';
import { UtilsController } from './utils.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeyValueRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [UtilsService],
  exports: [UtilsService],
  controllers: [UtilsController],
})
export class UtilsModule {}
