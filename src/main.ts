import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExeptionFilter } from './common/filters/global_exeption.filter.js';

function checkConfig() {
  const { DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }
  if (!JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not configured');
  }
}

async function bootstrap() {
  checkConfig();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new GlobalExeptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT token',
    })
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
