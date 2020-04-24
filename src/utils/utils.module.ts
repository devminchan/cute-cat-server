import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyValueRepository } from './keyvalue.repsitory';

@Module({
  imports: [TypeOrmModule.forFeature([KeyValueRepository])],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
