import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller.js';
import { AppService } from './service/app.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
