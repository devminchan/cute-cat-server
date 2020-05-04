import { ApiResponseProperty } from "@nestjs/swagger";

export class DefaultApiResponse {
  @ApiResponseProperty()
  statusCode: number;

  @ApiResponseProperty()
  message: string;
};
