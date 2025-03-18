import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InitRequestDto } from 'src/init/dto/request.dto';
import { InitService } from 'src/init/init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async shouldInit() {
    const res = await this.initService.shouldInit();
    return { value: res };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async initializeLMS(@Body() dto: InitRequestDto) {
    return this.initService.initializeLMS(dto);
  }
}
