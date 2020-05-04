import { ApiResponseProperty } from "@nestjs/swagger";

export class ImageResponse {
  @ApiResponseProperty()
  imageUrl: string;
}

export class DefaultApiResponse {
  @ApiResponseProperty()
  statusCode: number;

  @ApiResponseProperty()
  message: string;
};
