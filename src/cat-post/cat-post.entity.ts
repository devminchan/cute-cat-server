import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TimestampEntity } from 'src/utils/timestamp.entity';
import { User } from 'src/user/user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class CatPost extends TimestampEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @ApiResponseProperty()
  @Column({ nullable: false })
  content: string;

  @ApiResponseProperty()
  @Column({ name: 'image_url', nullable: false })
  imageUrl: string;

  @ApiResponseProperty()
  @Column({ name: 'post_url', nullable: true })
  postUrl: string;

  @ManyToOne(
    () => User,
    user => user.posts,
    { onDelete: 'CASCADE', nullable: false },
  )
  user: User;
}
