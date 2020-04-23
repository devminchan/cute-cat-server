import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      userId: createUserDto.userId,
      password: createUserDto.password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
