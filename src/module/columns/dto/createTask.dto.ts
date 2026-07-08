import { ApiProperty } from '@nestjs/swagger';
import { Prioriy } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    example: 'Implement API docs',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'Add Swagger metadata to every route and DTO',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 'user-id-123',
  })
  @IsString()
  assigneeId!: string;

  @ApiProperty({
    example: 'backend,docs,swagger',
  })
  @IsString()
  labels!: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-07-08T12:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  duedate!: Date;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  position!: number;

  @ApiProperty({
    enum: Prioriy,
    example: Prioriy.MEDIUM,
  })
  @IsEnum(Prioriy)
  priority!: Prioriy;

  @ApiProperty({
    example: 'Backend',
    description: 'Title of the label',
  })
  @IsString()
  labelTitle!: string;

  @ApiProperty({
    example: 'rgb(59, 130, 246)',
    description: 'Color of the label in RGB format',
  })
  @IsString()
  labelColor!: string;
}
