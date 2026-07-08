import { ApiProperty } from '@nestjs/swagger';
import { ColumnTitle } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class CreateColumnDTO {
  @ApiProperty({
    enum: ColumnTitle,
    example: ColumnTitle.TODO,
  })
  @IsEnum(ColumnTitle)
  title!: ColumnTitle;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  order!: number;
}
