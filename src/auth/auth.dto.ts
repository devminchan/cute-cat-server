import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  password: string;
}

export class LoginResult {
  @ApiResponseProperty()
  token: string;
}
