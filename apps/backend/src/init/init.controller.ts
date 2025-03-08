import { Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { InitRequestDto } from 'src/init/dto/request.dto';
import { InitResponseDto } from 'src/init/dto/response.dto';
import { InitService } from 'src/init/init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async shouldInit() {
    return this.initService.shouldInit();
  }

  @Post()
  @SerializeOptions({
    groups: ['user.all'],
  })
  async initializeLMS(dto: InitRequestDto) {
    return new InitResponseDto(await this.initService.initializeLMS(dto));
  }
}
