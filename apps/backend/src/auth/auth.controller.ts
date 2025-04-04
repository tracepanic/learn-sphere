import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@workspace/db';
import { Request as RequestType } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthenticationGuard } from 'src/auth/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: RequestType) {
    return this.authService.login(req.user as User);
  }
}
