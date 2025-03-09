import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    const timer = this.logger.startTimer();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      const stopTimer = timer();

      this.logger.logWithMeta(
        `HTTP Request ${method} ${originalUrl}`,
        {
          ip,
          method,
          userAgent,
          url: originalUrl,
          statusCode,
          contentLength,
          duration: `${stopTimer.duration}ms`,
        },
        'HttpRequest',
      );
    });

    next();
  }
}
