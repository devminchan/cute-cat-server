import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Put,
  Delete,
  Request,
  UseGuards,
  Get,
  HttpException,
  NotFoundException,
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
    const user = await this.userService.findByUserId(req.user.userId);

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
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard())
  @Put('/me')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.updateUser(req.user.seqNo, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard())
  @Delete('/me')
  async delete(@Request() req) {
    console.log(req.user);

    try {
      await this.userService.deleteUser(req.user.seqNo);

      return {
        status: '200',
        message: 'success',
      };
    } catch (e) {
      throw e;
    }
  }
}
