import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  oldPassword!: string;

  @IsString()
  newPassword!: string;
}
