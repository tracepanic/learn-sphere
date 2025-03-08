import { ConflictException, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { InitRequestDto } from 'src/init/dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/school/school.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly schoolService: SchoolService,
  ) {}

  async shouldInit(): Promise<{ value: boolean }> {
    const [users, schools] = await Promise.all([
      this.userService.countAll(),
      this.schoolService.countAll(),
    ]);

    if (users >= 1 || schools >= 1) {
      return { value: false };
    }

    return { value: true };
  }

  async initializeLMS(dto: InitRequestDto): Promise<{ success: boolean }> {
    const canInit = await this.shouldInit();

    if (!canInit.value) {
      throw new ConflictException('System already initialized');
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        // Hash password

        const user = await tx.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            username: dto.username,
            password: dto.password,
            roles: [UserRole.ADMIN],
          },
        });

        const school = await tx.school.create({ data: { name: dto.school } });

        await tx.schoolAdmins.create({
          data: { userId: user.id, schoolId: school.id },
        });
      });

      return { success: true };
    } catch (error) {
      console.error('Initialization failed:', error);
      return { success: false };
    }
  }
}
