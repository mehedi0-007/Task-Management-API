import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO } from '../dto/registerUser.dto';
import { LoginUserDTO } from '../dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppJwtService } from 'src/common/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

type RefreshTokenPayload = JwtPayload & {
  sub: string;
  name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: AppJwtService,
  ) {}

  async registerUser(value: RegisterUserDTO): Promise<any> {
    const hashedPassword = await bcrypt.hash(value.password, 10);

    await this.prisma.user.create({
      data: {
        fullName: value.fullName,
        email: value.email,
        password: hashedPassword,
        phoneNo: value.phoneNo,
      },
    });

    return null;
  }

  async loginUser(value: LoginUserDTO): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: value.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(value.password, user.password);

    if (!isValid) throw new UnauthorizedException('Authentication failed');

    const payload = {
      sub: user.id,
      name: user.fullName,
    };

    const tokens = await this.generateToken(payload);

    const { password, ...userData } = user;

    return {
      ...userData,
      ...tokens,
    };
  }

  async refreshAccessToken(userId: string, token: string): Promise<any> {
    await this.jwt.verifyRefreshToken(token);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(token, user.refreshToken ?? '');

    if (!isValid) throw new UnauthorizedException('Authentication failed');

    const tokens = await this.generateToken({
      sub: user.id,
      name: user.fullName,
    });

    return {
      ...tokens,
    };
  }

  private async generateToken(payload: {
    sub: string;
    name: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAccessToken(payload);
    const refreshToken = await this.jwt.signRefreshToken(payload);

    const hashToken = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: payload.sub },
      data: { refreshToken: hashToken },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
