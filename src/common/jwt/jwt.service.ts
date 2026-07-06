import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import type { StringValue } from 'ms';

configDotenv();

interface jwtPayload {
  sub: string;
  name: string;
}

@Injectable()
export class AppJwtService {
  constructor(private readonly jwt: JwtService) {}

  async signAccessToken(payload: jwtPayload) {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const accessExpire = (process.env.JWT_ACCESS_EXPIRE ??
      '15m') as StringValue;

    if (!accessExpire || !accessSecret)
      throw new NotFoundException('Secret not found');

    return await this.jwt.signAsync(payload, {
      secret: accessSecret,
      expiresIn: accessExpire,
    });
  }

  async signRefreshToken(payload: object) {
    const refreshExpire = (process.env.JWT_REFRESH_EXPIRE ??
      '7d') as StringValue;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!refreshExpire || !refreshSecret)
      throw new NotFoundException('Secret not found');

    return await this.jwt.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpire,
    });
  }

  async verifyAccessToken(token: string): Promise<object> {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    try {
      return await this.jwt.verifyAsync(token, { secret: accessSecret });
    } catch {
      throw new UnauthorizedException('Authentication failed');
    }
  }

  async verifyRefreshToken(token: string): Promise<object> {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    try {
      return await this.jwt.verifyAsync(token, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
