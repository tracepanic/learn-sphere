import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 255)
  readonly name: string;

  @IsEmail()
  @Length(5, 255)
  readonly email: string;

  @IsString()
  @Matches(/^[a-z0-9_]{5,30}$/)
  @Length(5, 50)
  readonly username: string;

  @IsString()
  @Length(8, 255)
  readonly password: string;
}
