import { ColumnName } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateColumnDTO {
  @IsEnum(ColumnName)
  columnName!: ColumnName;

  @IsNumber()
  order!: number;
}
