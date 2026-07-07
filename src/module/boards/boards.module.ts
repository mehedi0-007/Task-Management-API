import { Module } from '@nestjs/common';
import { BoardController } from './controller/boards.controller';
import { BoardService } from './service/boards.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
