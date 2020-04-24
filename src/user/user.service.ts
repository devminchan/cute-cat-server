import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      userId: createUserDto.userId,
      password: createUserDto.password,
    });

    return this.userRepository.save(newUser);
  }

  async findByUserId(userId: string): Promise<User | null> {
    return this.userRepository.findByUserId(userId);
  }
}
