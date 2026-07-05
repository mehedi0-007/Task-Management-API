import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AppJwtService } from '../jwt/jwt.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: AppJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Authentication failed');

    const payload = await this.jwt.verifyAccessToken(token);

    request['user'] = payload;

    return true;
  }
}
