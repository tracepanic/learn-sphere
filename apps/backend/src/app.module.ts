import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { InitModule } from 'src/init/init.module';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerMiddleware } from 'src/logger/middlewares/logger.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchoolModule } from 'src/school/school.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    InitModule,
    SchoolModule,
    LoggerModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
