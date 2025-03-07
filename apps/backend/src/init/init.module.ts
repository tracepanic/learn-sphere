import { Module } from '@nestjs/common';
import { InitController } from 'src/init/init.controller';
import { InitService } from 'src/init/init.service';

@Module({
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
