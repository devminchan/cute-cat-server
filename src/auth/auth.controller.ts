import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginRequest })
  @ApiOperation({
    description: 'id, password로 유저 로그인(jwt 토큰 발급)',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
