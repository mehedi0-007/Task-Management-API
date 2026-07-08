import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({
    example: 'Jhon Doe',
  })
  @IsString()
  fullName!: string;

  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '+1234567890',
  })
  @IsString()
  phoneNo!: string;

  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
