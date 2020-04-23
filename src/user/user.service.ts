import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, LoginUserDto, LoginResult } from './user.dto';

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

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResult> {
    const user = await this.userRepository.findByUserId(loginUserDto.userId);

    if (!user) {
      throw new HttpException(`Can't find user by userid`, 404);
    } else if (user.password !== loginUserDto.password) {
      throw new HttpException(`Userid and password are not matching`, 403);
    }

    return {
      token: 'Login success!',
    };
  }
}
