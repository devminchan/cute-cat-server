import { IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
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
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
