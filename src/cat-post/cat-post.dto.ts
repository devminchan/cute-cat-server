import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
