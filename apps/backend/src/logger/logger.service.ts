import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: Logger,
  ) {}

  log(message: string, context?: string) {
    this.winstonLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.winstonLogger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.winstonLogger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.winstonLogger.verbose(message, { context });
  }

  logWithMeta(message: string, meta: Record<string, any>, context?: string) {
    this.winstonLogger.info(message, { ...meta, context });
  }

  errorWithMeta(message: string, meta: Record<string, any>, context?: string) {
    this.winstonLogger.error(message, { ...meta, context });
  }

  startTimer(): () => { duration: number } {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      return { duration };
    };
  }
}
