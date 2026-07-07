import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
      where: { isDeleted: false },
      include: {
        columns: {
          where: { isDeleted: false },
          include: {
            tasks: {
              where: { isDeleted: false },
            },
          },
        },
      },
    });

    if (!boards) {
      return {
        message: 'No boards found',
        data: ' ',
      };
    }

    return {
      message: 'Boards found',
      data: boards,
    };
  }

  async getBoardInfo(boardid: string) {
    const boardData = await this.prisma.boards.findUnique({
      where: { id: boardid, isDeleted: false },
      include: {
        columns: {
          where: { isDeleted: false },
          include: {
            tasks: { where: { isDeleted: false } },
          },
        },
      },
    });

    if (!boardData) throw new NotFoundException('Board not found');

    return {
      message: 'Board found',
      data: boardData,
    };
  }

  async deleteBoard(boardId: string) {
    await this.prisma.boards.update({
      where: { id: boardId },
      data: { isDeleted: true },
    });

    return {
      message: 'Board deleted',
      data: ' ',
    };
  }

  async createColumn(id: string, columnData: CreateColumnDTO) {
    const board = await this.prisma.boards.findUnique({
      where: { id: id },
    });

    if (!board) throw new NotFoundException('Board not found');

    const newColumn = await this.prisma.columns.create({
      data: {
        boardId: id,
        columnName: columnData.columnName,
        order: columnData.order,
      },
    });

    if (!newColumn)
      throw new InternalServerErrorException('Internal server error');

    return {
      message: `Column created Successfully under the ${board.boardName} Board`,
      data: newColumn,
    };
  }
}
