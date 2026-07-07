import { Module } from '@nestjs/common';
import { ColumnService } from './service/column.service';
import { ColumnController } from './controller/column.controller';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
