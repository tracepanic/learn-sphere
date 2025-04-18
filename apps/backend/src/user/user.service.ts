import { Injectable } from '@nestjs/common';
import { User } from '@workspace/db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(): Promise<User | null> {
    return this.prisma.user.findFirst();
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
