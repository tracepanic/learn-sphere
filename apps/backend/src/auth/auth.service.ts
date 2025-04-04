import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PermissionAction, PermissionResource, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { SignJWT } from 'jose';
import { LoginResDto } from 'src/auth/dto/response.dto';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User | null): Promise<LoginResDto> {
    if (!user) throw new BadRequestException('Invalid credentials');
    return {
      name: user.name,
      username: user.username,
      accessInfo: await this.encodeAccessInfo(user.id, user.type),
      accessToken: await this.jwtSignAuth(user.id),
    };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.getByUsername(username);
    if (user && (await this.verifyPassword(user.password, password))) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async jwtSignAuth(userId: string): Promise<string> {
    const payload: JwtPayload = { sub: userId };

    return this.jwtService.signAsync(payload);
  }

  async encodeAccessInfo(userId: string, type: string): Promise<string> {
    const payload = { userId, type };
    const key = new TextEncoder().encode(
      this.configService.get<string>('SHARED_JWT_SECRET'),
    );

    const accessInfo = await new SignJWT(payload)
      .setIssuedAt()
      .setExpirationTime('1h')
      .setProtectedHeader({ alg: 'HS256' })
      .sign(key);

    return accessInfo;
  }

  async getUserPermissions(userId: string): Promise<
    | {
        id: string;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
        actions: PermissionAction[];
        resource: PermissionResource;
      }[]
    | undefined
  > {
    const res = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: { include: { permissions: true } } },
    });

    if (!res) throw new BadRequestException();

    return res.role?.permissions;
  }
}
