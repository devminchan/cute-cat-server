import { ApiResponseProperty } from '@nestjs/swagger';

export class ImageResponse {
  @ApiResponseProperty()
  imageUrl: string;
}
