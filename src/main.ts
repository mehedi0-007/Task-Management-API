import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExeptionFilter } from './common/filters/global_exeption.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExeptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
