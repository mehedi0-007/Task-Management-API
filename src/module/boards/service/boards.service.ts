import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateColumnDTO } from '../dto/column.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async createBoard(userId: string, boardName: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const boardData = await this.prisma.boards.create({
      data: {
        userId,
        boardName,
      },
    });

    return {
      message: 'Board created successfully',
      data: boardData,
    };
  }

  async getAllBoards() {
    const boards = await this.prisma.boards.findMany({
      where: { deletedAt: null },
    });

    if (!boards) {
      return {
        message: 'No boards found',
        data: null,
      };
    }

    return {
      message: 'Boards found successfully',
      data: boards,
    };
  }

  async getBoardInfo(boardId: string) {
    const boardData = await this.prisma.boards.findUnique({
      where: { id: boardId, deletedAt: null },
      include: {
        columns: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
          include: {
            tasks: {
              where: { deletedAt: null },
              orderBy: { position: 'asc' },
              include: {
                taskLabels: true,
              },
            },
          },
        },
      },
    });

    if (!boardData) throw new NotFoundException('Board not found');

    return {
      message: 'Board found successfully',
      data: boardData,
    };
  }

  async deleteBoard(boardId: string) {
    await this.prisma.boards.update({
      where: { id: boardId },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Board deleted successfully',
      data: null,
    };
  }

  async createColumn(id: string, columnData: CreateColumnDTO) {
    const board = await this.prisma.boards.findUnique({
      where: { id },
    });

    if (!board) throw new NotFoundException('Board not found');

    const data = await this.prisma.columns.create({
      data: {
        boardId: id,
        title: columnData.title,
        order: columnData.order,
      },
    });

    return {
      message: `Column created Successfully`,
      data,
    };
  }
}
