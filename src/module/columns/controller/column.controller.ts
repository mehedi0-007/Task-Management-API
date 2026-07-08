import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ColumnService } from '../service/column.service';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateColumnDTO } from '../dto/updateColumn.dts';
import { GetTaskDTO } from 'src/module/columns/dto/filterTask.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'Update a column' })
  @Patch('/:id')
  async updateColumn(@Param('id') id: string, @Body() dto: UpdateColumnDTO) {
    return await this.columnService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: 'Create a task in a column' })
  @Post('/:id/tasks')
  async createTasks(@Param('id') id: string, @Body() dto: CreateTaskDTO) {
    return await this.columnService.createTask(id, dto);
  }

  @ApiOperation({ summary: 'Get tasks for a column' })
  @Get('/:id/tasks')
  async getTasks(@Param('id') id: string, @Query() dto: GetTaskDTO) {
    return await this.columnService.getTasks(id, dto);
  }

  @ApiOperation({ summary: 'Delete a column' })
  @Delete('/:id')
  async deleteColumn(@Param('id') id: string) {
    return this.columnService.deleteColumn(id);
  }
}
