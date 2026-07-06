import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterUserDTO } from '../dto/registerUser.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginUserDTO } from '../dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/auth/register')
  async register(@Body() dto: RegisterUserDTO): Promise<any> {
    const result = (await this.authService.registerUser(dto)) as object;

    return {
      message: 'User created successfully',
      data: result,
    };
  }

  @Public()
  @Post('/auth/login')
  async logIn(@Body() dto: LoginUserDTO): Promise<any> {
    const userData = (await this.authService.loginUser(dto)) as object;

    return {
      message: 'Logged in successfully',
      data: userData,
    };
  }

  @Public()
  @Post('/auth/refresh')
  async refreshAccessToken(
    @Body() userId: string,
    refreshToken: string,
  ): Promise<any> {
    const result = (await this.authService.refreshAccessToken(
      userId,
      refreshToken,
    )) as object;

    return {
      message: 'Authentication Successful',
      data: result,
    };
  }
}
