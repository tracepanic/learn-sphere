import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminSettingsService } from 'src/admin-settings/admin-settings.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { UpdateGeneralSettingsDto } from 'src/admin-settings/dto/request.dto';
import { PermissionAction, PermissionResource } from '@workspace/db';

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

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions([
    {
      resource: PermissionResource.ADMIN_SETTINGS,
      actions: [PermissionAction.UPDATE],
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Put('general')
  updateGeneralSettings(@Body() dto: UpdateGeneralSettingsDto) {
    return this.adminSettingsService.updateGeneralSettings(dto);
  }
}
