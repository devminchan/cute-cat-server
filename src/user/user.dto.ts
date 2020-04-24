import { Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(4, 40)
  userId: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
