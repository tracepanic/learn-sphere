import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { InitModule } from 'src/init/init.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchoolModule } from 'src/school/school.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    InitModule,
    SchoolModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
