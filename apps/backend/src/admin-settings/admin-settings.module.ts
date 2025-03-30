import { Module } from '@nestjs/common';
import { AdminSettingsController } from 'src/admin-settings/admin-settings.controller';
import { AdminSettingsService } from 'src/admin-settings/admin-settings.service';

@Module({
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminSettingsModule {}
