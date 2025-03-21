import { ConflictException, Injectable } from '@nestjs/common';
import { Action, Resource, UserType } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { InitRequestDto } from 'src/init/dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/school/school.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly schoolService: SchoolService,
  ) {}

  async shouldInit(): Promise<boolean> {
    const [users, schools] = await Promise.all([
      this.userService.countAll(),
      this.schoolService.countAll(),
    ]);

    if (users >= 1 || schools >= 1) {
      return false;
    }

    return true;
  }

  async initializeLMS(dto: InitRequestDto): Promise<{ success: boolean }> {
    const canInit = await this.shouldInit();

    if (!canInit) {
      throw new ConflictException('System already initialized');
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        // SuperAdmin role
        const superAdminRole = await tx.role.create({
          data: {
            name: 'SuperAdmin',
          },
        });

        // SuperAdmin permissions
        await tx.permission.createMany({
          data: [
            {
              actions: Action.READ,
              resource: Resource.ADMIN_SETTINGS,
              roleId: superAdminRole.id,
            },
            {
              actions: Action.UPDATE,
              resource: Resource.ADMIN_SETTINGS,
              roleId: superAdminRole.id,
            },
          ],
        });

        const school = await tx.school.create({
          data: { name: dto.school },
        });

        await tx.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            type: UserType.ADMIN,
            username: dto.username,
            password: await this.authService.hashPassword(dto.password),
            roleId: superAdminRole.id,
            schoolId: school.id,
          },
        });
      });

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
