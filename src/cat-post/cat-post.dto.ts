import { IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiPropertyOptional()
  @IsOptional()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageUrl: string;
}
