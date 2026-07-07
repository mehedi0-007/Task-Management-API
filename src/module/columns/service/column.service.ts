import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO } from '../dto/createTask.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async updateColumn(id: string, title: string, order: number) {}

  async createTask(id: string, value: CreateTaskDTO) {
    const column = await this.prisma.columns.findUnique({ where: { id } });

    if (!column) throw new NotFoundException('Column not found');

    const task = await this.prisma.tasks.create({
      data: {
        columnId: id,
        title: value.title,
        description: value.description,
        assignee: value.assignee,
        labels: value.labels,
        position: value.position,
        priority: value.priority,
        dueDate: value.duedate,
      },
    });

    if (!task) throw new InternalServerErrorException('Inerneal server error');

    return {
      message: `Task created under the ${column.columnName} column`,
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
      data: { isDeleted: true },
    });

    return {
      message: `${column.columnName} Column deleted`,
      data: '',
    };
  }
}
