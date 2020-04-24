import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  UseGuards,
  Get,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('/me')
  async getUserInfo(@Request() req) {
    const user = await this.userService.findOne(req.user.seqNo);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard())
  @Patch('/me')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.updateUser(req.user.seqNo, updateUserDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard())
  @Delete('/me')
  async delete(@Request() req) {
    console.log(req.user);

    try {
      await this.userService.deleteUser(req.user.seqNo);

      return {
        statusCode: '200',
        message: 'success',
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
