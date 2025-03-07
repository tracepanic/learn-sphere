import { Module } from '@nestjs/common';
import { SchoolController } from 'src/school/school.controller';
import { SchoolService } from 'src/school/school.service';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
