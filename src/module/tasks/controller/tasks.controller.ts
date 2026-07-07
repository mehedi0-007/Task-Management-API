import { Controller, Delete, Param, Patch, Body } from '@nestjs/common';
import { TaskService } from '../service/tasks.service';
import { UpdateTaskDTO } from '../dto/updateTask.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Patch('/:id')
  async updateTasks(@Param('id') id: string, dto: UpdateTaskDTO) {
    return await this.taskService.updateTask(id, dto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id/position')
  async updateTaskPosition(@Param('id') id: string, @Body() position: number) {
    return await this.taskService.updateTaskposition(id, position);
  }
}
