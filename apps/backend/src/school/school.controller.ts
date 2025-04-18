import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SchoolService } from 'src/school/school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @HttpCode(HttpStatus.OK)
  @Get('info')
  async getSchoolInfo() {
    return this.schoolService.getSchoolInfo();
  }
}
