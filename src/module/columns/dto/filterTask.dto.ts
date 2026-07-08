import { Prioriy } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Prioriy)
  priority?: Prioriy;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
