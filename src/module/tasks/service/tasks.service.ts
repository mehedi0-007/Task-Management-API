import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDTO } from '../dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async updateTask(id: string, value: UpdateTaskDTO) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    await this.prisma.tasks.update({
      where: { id },
      data: {
        ...value,
      },
    });
  }

  async deleteTask(id: string) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    await this.prisma.tasks.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateTaskposition(id: string, position: number) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');
  }
}
