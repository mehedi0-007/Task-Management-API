import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ColumnService } from '../service/column.service';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateColumnDTO } from '../dto/updateColumn.dts';

@Controller('/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Patch('/:id')
  async updateColumn(@Param('id') id: string, @Body() dto: UpdateColumnDTO) {
    return await this.columnService.updateColumn(id, dto);
  }

  @Post('/:id/tasks')
  async createTasks(@Param('id') id: string, @Body() dto: CreateTaskDTO) {
    return await this.columnService.createTask(id, dto);
  }

  @Delete('/:id')
  async deleteColumn(@Param('id') id: string) {
    return this.columnService.deleteColumn(id);
  }
}
