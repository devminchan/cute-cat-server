import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { LoginRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginRequest })
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
