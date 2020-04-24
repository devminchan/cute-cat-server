import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TimestampEntity } from 'src/utils/timestamp.entity';

@Entity()
export class CatPost extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @Column({ nullable: false })
  content: string;

  @Column({ name: 'image_url', nullable: false })
  imageUrl: string;
}
