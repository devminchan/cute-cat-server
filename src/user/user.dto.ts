import { Length, IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 40)
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8)
  password: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, ['password']) {}
