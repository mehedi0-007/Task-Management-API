import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateColumnDTO } from '../dto/updateColumn.dts';
import { GetTaskDTO } from 'src/module/columns/dto/filterTask.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async updateColumn(id: string, value: UpdateColumnDTO) {
    const data = await this.prisma.$transaction(async (tx) => {
      const column = await tx.columns.findUnique({ where: { id } });

      if (!column) throw new NotFoundException('Column not found');

      const oldOrder = column.order;

      if (value.order && value.order < oldOrder) {
        await tx.columns.updateMany({
          where: {
            boardId: column.boardId,
            order: { gte: value.order, lt: oldOrder },
          },
          data: {
            order: { increment: 1 },
          },
        });
      } else {
        await tx.columns.updateMany({
          where: {
            boardId: column.boardId,
            order: { gt: oldOrder, lte: value.order },
          },
          data: {
            order: { decrement: 1 },
          },
        });
      }

      return await tx.columns.update({
        where: { id },
        data: { title: value.title, order: value.order },
      });
    });

    return {
      message: 'Column updated successfully',
      data: data,
    };
  }

  async createTask(id: string, value: CreateTaskDTO) {
    const column = await this.prisma.columns.findUnique({ where: { id } });

    if (!column) throw new NotFoundException('Column not found');

    const task = await this.prisma.tasks.create({
      data: {
        columnId: id,
        title: value.title,
        description: value.description,
        assigneeId: value.assigneeId,
        labels: value.labels,
        position: value.position,
        priority: value.priority,
        dueDate: value.duedate,
      },
    });

    return {
      message: `Task created successfully`,
      data: task,
    };
  }

  async getTasks(columnId: string, query: GetTaskDTO) {
    const where: Prisma.TasksWhereInput = {
      columnId,
      deletedAt: null,

      ...(query.title && {
        title: {
          contains: query.title,
          mode: 'insensitive',
        },
      }),

      ...(query.priority && {
        priority: query.priority,
      }),

      ...(query.dueDate && {
        dueDate: {
          gte: query.dueDate,
          lt: new Date(query.dueDate.getTime() + 24 * 60 * 60 * 1000),
        },
      }),
    };

    const task = await this.prisma.tasks.findMany({ where });

    if (!task) throw new NotFoundException('No task found');

    return {
      message: 'Tasks found successfully',
      data: task,
    };
  }

  async deleteColumn(columnId: string) {
    const column = await this.prisma.columns.findUnique({
      where: { id: columnId },
    });

    if (!column) throw new NotFoundException('Column not found');

    await this.prisma.columns.update({
      where: { id: columnId },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Column deleted successfully',
      data: null,
    };
  }
}
