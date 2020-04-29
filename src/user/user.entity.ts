import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimestampEntity } from 'src/utils/timestamp.entity';
import { CatPost } from 'src/cat-post/cat-post.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @Column({ name: 'user_id', length: 40, nullable: false, unique: true })
  userId: string;

  @Exclude()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(
    () => CatPost,
    catPost => catPost.user,
  )
  posts: CatPost[];
}
