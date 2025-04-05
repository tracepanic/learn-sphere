import { IsString, IsUrl, Length } from 'class-validator';

export class UpdateGeneralSettingsDto {
  @IsString()
  @Length(5, 255)
  readonly name: string;

  @IsString()
  @Length(15, 500)
  readonly description: string;

  @IsString()
  @IsUrl()
  @Length(5, 255)
  readonly website: string;
}
