import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TimestampEntity } from 'src/utils/timestamp.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class CatPost extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @Column({ nullable: false })
  content: string;

  @Column({ name: 'image_url', nullable: false })
  imageUrl: string;

  @Column({ name: 'is_published', nullable: false, default: false })
  isPublished: boolean;

  @ManyToOne(
    () => User,
    user => user.posts,
    { onDelete: 'CASCADE', nullable: false },
  )
  user: User;
}
