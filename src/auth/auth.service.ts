import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async genAuthToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId: user.userId,
        isAdmin: user.isAdmin,
      },
      {
        expiresIn: '7d',
      },
    );
  }

  async genPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(raw: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(raw, hashed);
  }
}
