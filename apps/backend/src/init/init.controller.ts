import { Body, Controller, Get, Post } from '@nestjs/common';
import { InitRequestDto } from 'src/init/dto/request.dto';
import { InitService } from 'src/init/init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async shouldInit() {
    return this.initService.shouldInit();
  }

  @Post()
  async initializeLMS(@Body() dto: InitRequestDto) {
    return this.initService.initializeLMS(dto);
  }
}
