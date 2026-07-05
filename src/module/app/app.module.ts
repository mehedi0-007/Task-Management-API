import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller.js';
import { AppService } from './service/app.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor.js';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
