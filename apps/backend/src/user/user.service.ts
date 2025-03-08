import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/request.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(): Promise<number> {
    return this.prisma.user.count();
  }

  private async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  private async getByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  private async create(
    role: UserRole,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const [userByEmail, userByUsername] = await Promise.all([
      this.getByEmail(createUserDto.email),
      this.getByUsername(createUserDto.username),
    ]);

    if (userByEmail) throw new BadRequestException('Email already exists');
    if (userByUsername) {
      throw new BadRequestException('Username already exists');
    }

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        username: createUserDto.username,
        roles: [role],
        password: createUserDto.password,
      },
    });
  }
}
