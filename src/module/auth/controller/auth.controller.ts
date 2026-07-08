import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterUserDTO } from '../dto/registerUser.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginUserDTO } from '../dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDTO } from '../dto/refreshToken.dto';

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

  @ApiOperation({ summary: 'Log in a user' })
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

  @ApiOperation({ summary: 'Refresh the access token' })
  @Throttle({
    default: {
      limit: 15,
      ttl: 60_000,
    },
  })
  @Post('/refresh')
  async refreshAccessToken(@Body() dto: RefreshTokenDTO) {
    return await this.authService.refreshAccessToken(
      dto.userId,
      dto.refreshToken,
    );
  }
}
