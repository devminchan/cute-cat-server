import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: '유저 자기 자신의 정보 조회',
  })
  @UseGuards(AuthGuard())
  @Get('/me')
  async getUserInfo(@Request() req) {
    const user = await this.userService.findOne(req.user.seqNo);

    return user;
  }

  @ApiOperation({
    description: '유저 회원가입',
  })
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @ApiOperation({
    description: '유저정보(비밀번호) 수정',
  })
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

  @ApiOperation({
    description: '회원탈퇴(자신)',
  })
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
