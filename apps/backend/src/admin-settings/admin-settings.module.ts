import { Module } from '@nestjs/common';
import { AdminSettingsController } from 'src/admin-settings/admin-settings.controller';
import { AdminSettingsService } from 'src/admin-settings/admin-settings.service';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [SchoolModule],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminSettingsModule {}
