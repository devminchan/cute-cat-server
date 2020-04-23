import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByUserId(userId: string) {
    return await this.findOne({ userId });
  }
}
