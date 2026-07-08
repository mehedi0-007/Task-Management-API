import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdatePasswordDTO } from '../dto/updatePassword.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user information' })
  @Get('/:id')
  async getUserInfo(@Param('id') id: string) {
    return await this.userService.getUserInfo(id);
  }

  @ApiOperation({ summary: 'Update user password' })
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

  @ApiOperation({ summary: 'Get the task activity log' })
  @Get('/taskLog')
  async getTaskLogging() {
    return await this.userService.getTaskLog();
  }
}
