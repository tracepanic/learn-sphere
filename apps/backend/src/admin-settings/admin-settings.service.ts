import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GetGeneralSettingsRes,
  UpdateGeneralSettingsRes,
} from 'src/admin-settings/dto/response.dto';
import { UpdateGeneralSettingsDto } from 'src/admin-settings/dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class AdminSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schoolService: SchoolService,
  ) {}

  getGeneralSettings(): Promise<GetGeneralSettingsRes | null> {
    return this.prisma.school.findFirst({
      select: { name: true, description: true, website: true },
    });
  }

  async updateGeneralSettings(
    dto: UpdateGeneralSettingsDto,
  ): Promise<UpdateGeneralSettingsRes> {
    const school = await this.schoolService.findFirst();
    if (!school) throw new NotFoundException('School not found');

    const res = await this.prisma.school.update({
      where: { id: school.id },
      data: {
        name: dto.name,
        description: dto.description,
        website: dto.website,
      },
    });

    if (!res) throw new BadRequestException('Settings could not be updated');

    return {
      name: res.name,
      description: res.description,
      website: res.website,
    };
  }
}
