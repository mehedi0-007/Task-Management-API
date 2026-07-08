import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;

    return {
      message: 'User found successfully',
      data: result,
    };
  }

  async updatePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(oldPass, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid Password provided');

    const hashPass = await bcrypt.hash(newPass, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashPass },
    });

    return {
      message: 'Password updated successfully',
      data: null,
    };
  }
}
