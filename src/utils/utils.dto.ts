import { ApiProperty } from '@nestjs/swagger';

export class SetFacebookTokenDto {
  @ApiProperty()
  token: string;
}

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
