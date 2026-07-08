import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  password!: string;
}
