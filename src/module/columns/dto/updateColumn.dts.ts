import { ColumnTitle } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateColumnDTO {
  @IsEnum(ColumnTitle)
  title!: ColumnTitle;

  @IsNumber()
  order!: number;
}
