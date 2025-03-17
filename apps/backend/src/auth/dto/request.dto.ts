import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(5, 50)
  readonly username: string;

  @IsString()
  @Length(8, 255)
  readonly password: string;
}
