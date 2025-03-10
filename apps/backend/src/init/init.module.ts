import { Module } from '@nestjs/common';
import { InitController } from 'src/init/init.controller';
import { InitService } from 'src/init/init.service';
import { LoggerModule } from 'src/logger/logger.module';
import { SchoolModule } from 'src/school/school.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, SchoolModule, LoggerModule],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
