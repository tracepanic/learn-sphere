import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const isDev = process.env.NODE_ENV !== 'production';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
        exposeUnsetFields: false,
      },
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validationError: {
        target: isDev,
        value: isDev,
      },
      exceptionFactory: (errors) => {
        if (!isDev) {
          return new BadRequestException({
            statusCode: 400,
            message: 'Validation failed',
          });
        }

        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(8000, '0.0.0.0');
}

void bootstrap();
