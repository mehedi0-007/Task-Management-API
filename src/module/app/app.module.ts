import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller.js';
import { AppService } from './service/app.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor.js';
import { AppJwtModule } from '../../common/jwt/jwt.module.js';
import { LoggerInterceptor } from '../../common/interceptors/logger.interceptor.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { AuthModule } from '../auth/auth.module.js';
import { BoardModule } from '../boards/boards.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ColumnModule } from '../columns/column.module.js';
import { TaskModule } from '../tasks/tasks.module.js';
import { UserModule } from '../users/user.module.js';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 50 }]),
    PrismaModule,
    AppJwtModule,
    AuthModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
