import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDTO } from '../dto/registerUser.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from '../dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

    return {
      message: 'User Created Sucesfully',
      data: null,
    };
  }

  async loginUser(value: LoginUserDTO): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: value.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const payload = {
      sub: user.id,
      name: user.fullName,
    };

    // const jwtAccessToken =
  }

  async updateRefreshToken(userId: string, token: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const hashToken = await bcrypt.hash(token, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashToken },
    });
  }
}
