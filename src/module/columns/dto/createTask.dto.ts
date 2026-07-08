import { Prioriy } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  assigneeId!: string;

  @IsString()
  labels!: string;

  @IsDate()
  duedate!: Date;

  @IsNumber()
  position!: number;

  @IsEnum(Prioriy)
  priority!: Prioriy;
}
