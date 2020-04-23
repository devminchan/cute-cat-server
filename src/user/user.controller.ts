import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('user dto:', createUserDto);

    return createUserDto;
  }
}
