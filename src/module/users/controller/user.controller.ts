import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdatePasswordDTO } from '../dto/updatePassword.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserInfo(@Param('id') id: string) {
    return await this.userService.getUserInfo(id);
  }

  @Patch('/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDTO,
  ) {
    return await this.userService.updatePassword(
      id,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
