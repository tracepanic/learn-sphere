import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtPayload } from 'src/auth/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: User | null) {
    if (!user) throw new BadRequestException('Invalid credentials');
    return { access_token: await this.jwtSignAuth(user.id) };
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
}
