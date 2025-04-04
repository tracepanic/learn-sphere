import { Injectable } from '@nestjs/common';
import { School } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(): Promise<number> {
    return this.prisma.school.count();
  }

  async findFirst(): Promise<School | null> {
    return this.prisma.school.findFirst();
  }
}
