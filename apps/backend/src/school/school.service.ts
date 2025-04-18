import { Injectable } from '@nestjs/common';
import { School } from '@workspace/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolInfo } from 'src/school/types';

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(): Promise<School | null> {
    return this.prisma.school.findFirst();
  }

  async getSchoolInfo(): Promise<SchoolInfo | null> {
    return this.prisma.school.findFirst({
      select: { name: true, description: true },
    });
  }
}
