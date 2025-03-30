import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetGeneralSettingsRes } from './dto/response.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  getGeneralSettings(): Promise<GetGeneralSettingsRes | null> {
    return this.prisma.school.findFirst({ select: { name: true } });
  }
}
