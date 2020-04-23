import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, LoginUserDto, LoginResult } from './user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = await this.authService.genPassword(createUserDto.password);

    const user = this.userRepository.create({
      userId: createUserDto.userId,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResult> {
    const user = await this.userRepository.findByUserId(loginUserDto.userId);

    if (!user) {
      throw new HttpException(`Can't find user by userid`, 404);
    }

    const isPasswordEquals = await this.authService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordEquals) {
      throw new HttpException(`Userid and password are not matching`, 403);
    }

    const jwt = await this.authService.genAuthToken(user);

    return {
      token: jwt
    };
  }
}
