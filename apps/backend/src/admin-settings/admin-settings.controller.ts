import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PermissionAction, PermissionResource } from '@prisma/client';
import { AdminSettingsService } from 'src/admin-settings/admin-settings.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';

@Controller('settings/admin')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions([
    {
      resource: PermissionResource.ADMIN_SETTINGS,
      actions: [PermissionAction.READ],
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Get('general')
  getGeneralSettings() {
    return this.adminSettingsService.getGeneralSettings();
  }
}
