import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions.decorator';
import { RequestWithUser } from 'src/auth/types';
import { PermissionDto } from 'src/roles/dto/request.dto';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user.sub) throw new UnauthorizedException();

    const routePermissions: PermissionDto[] = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!routePermissions) return true;

    try {
      const userPermissions = await this.authService.getUserPermissions(
        request.user.sub,
      );

      if (!userPermissions) throw new ForbiddenException();

      for (const routePermission of routePermissions) {
        const userPermission = userPermissions.find(
          (perm) => perm.resource === routePermission.resource,
        );

        if (!userPermission) throw new ForbiddenException();

        const allActionsAvailable = routePermission.actions.every(
          (requiredAction) => userPermission.actions.includes(requiredAction),
        );

        if (!allActionsAvailable) throw new ForbiddenException();
      }
    } catch {
      throw new ForbiddenException();
    }

    return true;
  }
}
