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
import { ApiOperation, ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { User } from './user.entity';
import { DefaultApiResponse } from '../base/base.types';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '유저 자기 자신의 정보 조회',
  })
  @ApiResponse({
    status: 200,
    type: User,
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
  @ApiResponse({
    status: 201,
    type: User,
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

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '유저정보(비밀번호) 수정',
  })
  @ApiResponse({
    status: 200,
    type: User,
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

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiOperation({
    description: '회원탈퇴(자신)',
  })
  @ApiResponse({
    status: 200,
    type: DefaultApiResponse,
  })
  @UseGuards(AuthGuard())
  @Delete('/me')
  async delete(@Request() req) {
    console.log(req.user);

    try {
      await this.userService.deleteUser(req.user.seqNo);

      return {
        statusCode: 200,
        message: 'success',
      } as DefaultApiResponse;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
