import { Prioriy } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  assignee?: string;

  @IsOptional()
  @IsString()
  labels?: string;

  @IsOptional()
  @IsDate()
  duedate?: Date;

  @IsOptional()
  @IsEnum(Prioriy)
  priority?: Prioriy;

  @IsOptional()
  @IsString()
  columnId?: string;
}
