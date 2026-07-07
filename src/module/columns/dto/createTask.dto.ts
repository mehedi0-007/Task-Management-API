import { Prioriy } from '@prisma/client';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  assignee!: string;

  @IsString()
  labels!: string;

  @IsDate()
  duedate!: Date;

  @IsEnum(Prioriy)
  priority!: Prioriy;
}
