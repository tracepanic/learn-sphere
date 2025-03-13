import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 255)
  readonly name: string;

  @IsEmail()
  @Length(5, 255)
  readonly email: string;

  @IsString()
  @Length(5, 50)
  readonly username: string;

  @IsString()
  @Length(8, 255)
  readonly password: string;
}
