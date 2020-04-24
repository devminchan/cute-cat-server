import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(userId: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUserId(userId);

    if (!user) {
      console.log(`user not found, id: ${userId}`);
      return null;
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      console.log('wrong password');
      return null;
    }

    return user;
  }
}
