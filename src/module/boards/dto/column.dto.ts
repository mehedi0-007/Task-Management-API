import { ColumnName } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ColumnCreateDTO {
  @IsString()
  boardId!: string;

  @IsEnum(ColumnName)
  columnName!: ColumnName;

  @IsNumber()
  order!: number;
}
