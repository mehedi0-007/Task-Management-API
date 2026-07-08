import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class MoveTaskDTO {
  @ApiProperty({
    example: 'column-id-456',
  })
  @IsString()
  destColumnId!: string;

  @ApiProperty({
    example: 3,
  })
  @IsInt()
  destPosition!: number;
}
