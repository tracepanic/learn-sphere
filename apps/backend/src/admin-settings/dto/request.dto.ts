import { IsString, Length } from 'class-validator';

export class UpdateGeneralSettingsDto {
  @IsString()
  @Length(5, 255)
  readonly name: string;
}
