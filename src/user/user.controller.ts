import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.userService.loginUser(loginUserDto);

    return result;
  }
}
