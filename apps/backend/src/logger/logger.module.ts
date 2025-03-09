import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from 'src/logger/logger.service';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          transports: [
            new winston.transports.Console({
              level: isProduction ? 'info' : 'debug',
              format: winston.format.combine(
                winston.format.timestamp(),
                isProduction
                  ? winston.format.json()
                  : winston.format.combine(
                      winston.format.colorize(),
                      winston.format.simple(),
                    ),
              ),
            }),
            ...(isProduction
              ? [
                  new winston.transports.File({
                    level: 'error',
                    filename: 'logs/error.log',
                    maxsize: 10 * 1024 * 1024,
                    maxFiles: 5,
                    format: winston.format.combine(
                      winston.format.timestamp(),
                      winston.format.json(),
                    ),
                  }),
                  new winston.transports.File({
                    filename: 'logs/combined.log',
                    maxsize: 10 * 1024 * 1024,
                    maxFiles: 5,
                    format: winston.format.combine(
                      winston.format.timestamp(),
                      winston.format.json(),
                    ),
                  }),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
