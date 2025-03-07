import { Controller, Get } from '@nestjs/common';
import { InitService } from 'src/init/init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async shouldInit() {
    return this.initService.shouldInit();
  }
}
