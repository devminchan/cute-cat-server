import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class KeyValue {
  @ApiResponseProperty()
  @PrimaryColumn({ name: 'key', nullable: false, unique: true })
  key: string;

  @ApiResponseProperty()
  @Column({ name: 'value', nullable: false })
  value: string;
}
