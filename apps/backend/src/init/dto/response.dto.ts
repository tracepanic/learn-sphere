import { Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class InitResponseDto extends BaseDto<InitResponseDto> {
  @Expose({ groups: ['user.all'] })
  @IsBoolean()
  success: boolean;

  constructor(partial: Partial<InitResponseDto> = {}) {
    super(partial);
  }
}
