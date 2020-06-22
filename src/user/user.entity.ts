import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimestampEntity } from '../base/timestamp.entity';
import { CatPost } from '../cat-post/cat-post.entity';
import { Exclude } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User extends TimestampEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @ApiResponseProperty()
  @Column({ name: 'user_id', length: 40, nullable: false, unique: true })
  userId: string;

  @Exclude()
  @Column({ name: 'password', nullable: false })
  password: string;

  @ApiResponseProperty()
  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(
    () => CatPost,
    catPost => catPost.user,
  )
  posts: CatPost[];
}
