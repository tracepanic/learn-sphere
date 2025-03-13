import { IsString, Length } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/request.dto';

export class InitRequestDto extends CreateUserDto {
  @IsString()
  @Length(5, 255)
  readonly school: string;
}
