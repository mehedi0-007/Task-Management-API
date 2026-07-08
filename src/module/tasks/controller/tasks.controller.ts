import { Delete, Param, Patch, Body, Controller } from '@nestjs/common';
import { TaskService } from '../service/tasks.service';
import { UpdateTaskDTO } from '../dto/updateTask.dto';
import { MoveTaskDTO } from '../dto/moveTask.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Update a task' })
  @ApiBody({ type: UpdateTaskDTO })
  @Patch('/:id')
  async updateTasks(@Param('id') id: string, @Body() dto: UpdateTaskDTO) {
    return await this.taskService.updateTask(id, dto);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @ApiOperation({ summary: 'Move a task to a different position' })
  @Patch('/:id/position')
  async updateTaskPosition(@Param('id') id: string, @Body() dto: MoveTaskDTO) {
    return await this.taskService.updateTaskposition(id, dto);
  }
}
