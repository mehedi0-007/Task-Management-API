import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({
    example: 'old-password-123',
  })
  @IsString()
  oldPassword!: string;

  @ApiProperty({
    example: 'new-password-456',
  })
  @IsString()
  newPassword!: string;
}
