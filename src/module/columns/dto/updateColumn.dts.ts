import { ColumnTitle } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateColumnDTO {
  @IsOptional()
  @IsEnum(ColumnTitle)
  title?: ColumnTitle;

  @IsOptional()
  @IsNumber()
  order?: number;
}
