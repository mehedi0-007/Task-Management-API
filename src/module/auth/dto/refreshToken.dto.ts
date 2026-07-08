import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    example: 'hsdfhhiu342h5i3u45ghiu3g5i3g5iu3',
    description: 'User Id',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    example: 'ajhsfiuhui3h6oiuh2345643h56b4h34h5h325h5',
    description: 'Refresh Token',
  })
  @IsString()
  refreshToken!: string;
}
