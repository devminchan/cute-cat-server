import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
