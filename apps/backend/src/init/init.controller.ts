import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
  async initializeLMS(@Req() req: Request, @Body() dto: InitRequestDto) {
    console.log('📝 Raw Request Body:', req.body);
    console.log('🎯 Parsed DTO:', dto);
    return this.initService.initializeLMS(dto);
  }
}
