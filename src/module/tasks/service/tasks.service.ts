import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UpdateTaskDTO } from '../dto/updateTask.dto';
import { MoveTaskDTO } from '../dto/moveTask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async updateTask(id: string, value: UpdateTaskDTO) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    await this.prisma.tasks.update({
      where: { id },
      data: value,
    });
  }

  async deleteTask(id: string) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    await this.prisma.tasks.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Task deleted successfully',
      data: null,
    };
  }

  async updateTaskposition(id: string, userId: string, value: MoveTaskDTO) {
    const data = await this.prisma.$transaction(async (tx) => {
      const task = await tx.tasks.findUnique({ where: { id } });

      if (!task) throw new NotFoundException('Task not found');

      const oldPosition = task.position;

      const newPosition = value.destPosition;

      await tx.tasks.updateMany({
        where: {
          columnId: task.columnId,
          position: { gt: oldPosition },
        },
        data: {
          position: { decrement: 1 },
        },
      });

      await tx.tasks.updateMany({
        where: {
          columnId: task.columnId,
          position: { gt: newPosition },
        },
        data: {
          position: { increment: 1 },
        },
      });

      await tx.tasks.update({
        where: { id },
        data: {
          columnId: value.destColumnId,
          position: value.destPosition,
        },
      });

      await this.prisma.task_Act.create({
        data: {
          userId: userId,
          title: `Moved the ${task.title} from one column to another one.`,
          createdAt: new Date(),
        },
      });
    });

    return {
      message: 'Task updated successfully',
      data,
    };
  }
}
