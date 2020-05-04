import { ApiResponseProperty } from "@nestjs/swagger";

export class LoginResult {
  @ApiResponseProperty()
  token: string;
};
