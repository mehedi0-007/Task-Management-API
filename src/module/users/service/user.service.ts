import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly Prisma: PrismaService) {}

  async getUserInfo(userId: string) {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;

    return {
      message: 'User found',
      data: result,
    };
  }

  async updatePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(oldPass, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid Password provided');

    const hashPass = await bcrypt.hash(newPass, 10);

    await this.Prisma.user.update({
      where: { id: userId },
      data: { password: hashPass },
    });

    return {
      message: 'Password Updated Successfully',
      data: ' ',
    };
  }
}
