import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(userSeqNo: number): Promise<User> {
    const user = await this.userRepository.findOne({ seqNo: userSeqNo });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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
    const user = await this.userRepository.findOne({ seqNo });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.password = await bcrypt.hash(updateUserDto.password, 10);

    return await this.userRepository.save(user);
  }

  async deleteUser(seqNo: number) {
    const result = await this.userRepository.delete({
      seqNo,
    });

    if (result.affected <= 0) {
      throw new BadRequestException('no one is deleted');
    }
  }
}
