import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterUserDTO } from '../dto/registerUser.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginUserDTO } from '../dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Throttle({
    default: {
      limit: 5,
      ttl: 60_000,
    },
  })
  @Post('/register')
  async register(@Body() dto: RegisterUserDTO) {
    return await this.authService.registerUser(dto);
  }

  @Throttle({
    default: {
      limit: 5,
      ttl: 60_000,
    },
  })
  @Post('/login')
  async logIn(@Body() dto: LoginUserDTO) {
    return await this.authService.loginUser(dto);
  }

  @Throttle({
    default: {
      limit: 15,
      ttl: 60_000,
    },
  })
  @Post('/refresh')
  async refreshAccessToken(@Body() userId: string, refreshToken: string) {
    return await this.authService.refreshAccessToken(userId, refreshToken);
  }
}
