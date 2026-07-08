import { IsInt, IsString } from 'class-validator';

export class MoveTaskDTO {
  @IsString()
  destColumnId!: string;

  @IsInt()
  destPosition!: number;
}
