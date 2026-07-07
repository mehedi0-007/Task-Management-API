import { Module } from '@nestjs/common';
import { TaskService } from './service/tasks.service';
import { TaskController } from './controller/tasks.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
