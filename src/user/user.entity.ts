import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  seqNo: number;

  @Column({ name: 'user_id', length: 40, nullable: false, unique: true })
  userId: string;

  @Column({ name: 'password', length: 40, nullable: false })
  password: string;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;
}
