import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { InitModule } from 'src/init/init.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, InitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
