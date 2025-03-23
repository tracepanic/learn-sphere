import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PermissionAction, PermissionResource, User } from '@prisma/client';
import { Request as RequestType } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { LocalAuthenticationGuard } from 'src/auth/guards/local.guard';
import { RequestWithUser } from 'src/auth/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: RequestType) {
    return this.authService.login(req.user as User);
  }

  // This is a test route to check RBAC
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions([
    {
      resource: PermissionResource.ADMIN_SETTINGS,
      actions: [PermissionAction.READ, PermissionAction.UPDATE],
    },
  ])
  @Get('test')
  test(@Request() req: RequestWithUser) {
    return { message: 'Accessed Resource', userId: req.user.sub };
  }
}
