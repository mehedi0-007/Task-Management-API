import { ApiProperty } from '@nestjs/swagger';
import { ColumnTitle } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateColumnDTO {
  @ApiProperty({
    required: false,
    enum: ColumnTitle,
    example: ColumnTitle.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(ColumnTitle)
  title?: ColumnTitle;

  @ApiProperty({
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
