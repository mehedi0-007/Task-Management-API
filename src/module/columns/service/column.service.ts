import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateColumnDTO } from '../dto/updateColumn.dts';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async updateColumn(id: string, value: UpdateColumnDTO) {
    return this.prisma.$transaction(async (tx) => {
      const column = await tx.columns.findUnique({ where: { id } });

      if (!column) throw new NotFoundException('Column not found');

      const oldOrder = column.order;

      if (oldOrder === value.order)
        return {
          message: 'Column order remained same',
          data: column,
        };

      if (value.order < oldOrder) {
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

    if (!task) throw new InternalServerErrorException('Inerneal server error');

    return {
      message: `Task created under the ${column.title} column`,
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
      message: `${column.title} Column deleted`,
      data: '',
    };
  }
}
