import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('user dto:', createUserDto);

    const result = await this.userService.createUser(createUserDto);

    return result;
  }
}
