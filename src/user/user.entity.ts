import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TimestampEntity } from 'src/utils/timestamp.entity';

@Entity({ name: 'user' })
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'seq_no' })
  seqNo: number;

  @Column({ name: 'user_id', length: 40, nullable: false, unique: true })
  userId: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;
}
