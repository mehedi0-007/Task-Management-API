import { ApiProperty } from '@nestjs/swagger';
import { Prioriy } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @ApiProperty({
    required: false,
    example: 'Refine API docs',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    required: false,
    example: 'Update all routes and DTOs with Swagger decorators',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: true,
    example: 'user-id-123',
  })
  @IsOptional()
  @IsString()
  assignee?: string;

  @ApiProperty({
    required: false,
    example: 'docs,swagger',
  })
  @IsOptional()
  @IsString()
  labels?: string;

  @ApiProperty({
    required: false,
    type: String,
    format: 'date-time',
    example: '2026-07-08T12:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  duedate?: Date;

  @ApiProperty({
    required: false,
    enum: Prioriy,
    example: Prioriy.LOW,
  })
  @IsOptional()
  @IsEnum(Prioriy)
  priority?: Prioriy;

  @ApiProperty({
    required: false,
    example: 'column-id-789',
  })
  @IsOptional()
  @IsString()
  columnId?: string;
}
