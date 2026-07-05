import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller.js';
import { AppService } from './service/app.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor.js';
import { AppJwtModule } from '../../common/jwt/jwt.module.js';
import { LoggerInterceptor } from '../../common/interceptors/logger.interceptor.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';

@Module({
  imports: [PrismaModule, AppJwtModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
