import { ApiProperty } from '@nestjs/swagger';
import { Prioriy } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskDTO {
  @ApiProperty({
    required: false,
    example: 'Implement API docs',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    required: false,
    enum: Prioriy,
    example: Prioriy.HIGH,
  })
  @IsOptional()
  @IsEnum(Prioriy)
  priority?: Prioriy;

  @ApiProperty({
    required: false,
    type: String,
    format: 'date-time',
    example: '2026-07-08T12:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
