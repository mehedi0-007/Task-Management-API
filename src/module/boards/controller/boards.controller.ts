import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from '../service/boards.service';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

interface jwtPayload {
  sub: string;
  email: string;
}

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(
    @Body() boardName: string,
    @CurrentUser() user: jwtPayload,
  ) {
    return await this.boardService.createBoard(user.sub, boardName);
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
}
