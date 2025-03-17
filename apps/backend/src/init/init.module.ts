import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { InitController } from 'src/init/init.controller';
import { InitService } from 'src/init/init.service';
import { SchoolModule } from 'src/school/school.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule, SchoolModule],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
