import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  password: string;
}
