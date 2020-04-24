import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(userSeqNo: number) {
    return this.userRepository.findOne(userSeqNo);
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      userId: createUserDto.userId,
      password: createUserDto.password,
    });

    const encodedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = encodedPassword;

    return this.userRepository.save(newUser);
  }

  async findByUserId(userId: string): Promise<User | null> {
    return this.userRepository.findByUserId(userId);
  }

  async updateUser(seqNo: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(seqNo);
    user.password = await bcrypt.hash(updateUserDto.password, 10);

    return await this.userRepository.save(user);
  }

  async deleteUser(seqNo: number) {
    const result = await this.userRepository.delete(seqNo);

    if (result.affected == 0) {
      throw new NotFoundException();
    }
  }
}
