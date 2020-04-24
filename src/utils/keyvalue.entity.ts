import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class KeyValue {
  @PrimaryColumn({ name: 'key', nullable: false, unique: true })
  key: string;

  @Column({ name: 'value', nullable: false })
  value: string;
}
