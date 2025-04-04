import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetGeneralSettingsRes } from 'src/admin-settings/dto/response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/school/school.service';
import { UpdateGeneralSettingsDto } from './dto/request.dto';

@Injectable()
export class AdminSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schoolService: SchoolService,
  ) {}

  getGeneralSettings(): Promise<GetGeneralSettingsRes | null> {
    return this.prisma.school.findFirst({ select: { name: true } });
  }

  async updateGeneralSettings(
    dto: UpdateGeneralSettingsDto,
  ): Promise<{ name: string }> {
    const school = await this.schoolService.findFirst();
    if (!school) throw new NotFoundException('School not found');

    const res = await this.prisma.school.update({
      where: { id: school.id },
      data: { name: dto.name },
    });

    if (!res) throw new BadRequestException('Settings could not be updated');

    return { name: res.name };
  }
}
