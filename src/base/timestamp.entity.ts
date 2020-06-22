import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class TimestampEntity {
  @ApiResponseProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdDate: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedDate: Date;
}
