import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from '../service/boards.service';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CreateColumnDTO } from '../dto/column.dto';

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(
    @Body() boardName: string,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.boardService.createBoard(userId, boardName);
  }

  @Get()
  async getAllBoards() {
    return await this.boardService.getAllBoards();
  }

  @Get('/:id')
  async getBoardInfo(@Param('id') id: string) {
    return await this.boardService.getBoardInfo(id);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string) {
    return await this.boardService.deleteBoard(id);
  }

  @Post('/:id/columns')
  async createColumns(@Param('id') id: string, @Body() dto: CreateColumnDTO) {
    return this.boardService.createColumn(id, dto);
  }
}
