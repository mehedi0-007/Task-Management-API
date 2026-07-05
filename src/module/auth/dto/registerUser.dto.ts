import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNo: string;

  @IsString()
  @MinLength(8)
  password: string;
}
