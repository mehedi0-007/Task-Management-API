import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from '../service/boards.service';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CreateColumnDTO } from '../dto/column.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class CreateBoardDTO {
  @ApiProperty({
    example: 'Sprint Board',
  })
  @IsString()
  boardName!: string;
}

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: 'Create a board' })
  @Post()
  async createBoard(
    @Body() dto: CreateBoardDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.boardService.createBoard(userId, dto.boardName);
  }

  @ApiOperation({ summary: 'Get all boards' })
  @Get()
  async getAllBoards() {
    return await this.boardService.getAllBoards();
  }

  @ApiOperation({ summary: 'Get a board by id' })
  @Get('/:id')
  async getBoardInfo(@Param('id') id: string) {
    return await this.boardService.getBoardInfo(id);
  }

  @ApiOperation({ summary: 'Delete a board' })
  @Delete('/:id')
  async deleteBoard(@Param('id') id: string) {
    return await this.boardService.deleteBoard(id);
  }

  @ApiOperation({ summary: 'Create columns for a board' })
  @Post('/:id/columns')
  async createColumns(@Param('id') id: string, @Body() dto: CreateColumnDTO) {
    return this.boardService.createColumn(id, dto);
  }
}
