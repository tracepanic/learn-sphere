import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { LoggerService } from 'src/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useLogger(app.get<LoggerService>(LoggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
      transform: true, // Transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: false, // Disable implicit type conversion
        exposeUnsetFields: false, // Don't expose fields that weren't explicitly set
        excludeExtraneousValues: true, // Remove all fields not explicitly exposed
      },
      forbidUnknownValues: true, // Reject payloads with unknown properties
      stopAtFirstError: true, // Stop validation at first error for better performance
      validationError: {
        target: false, // Don't expose the target object in error messages
        value: false, // Don't expose the validated value in error messages
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      // Only expose properties with @Expose decorator
      excludeExtraneousValues: true,
      // Don't expose any properties by default
      excludePrefixes: ['__', '_', '$'],
      enableImplicitConversion: false,
    }),
  );

  await app.listen('8000', '0.0.0.0');
}

void bootstrap();
