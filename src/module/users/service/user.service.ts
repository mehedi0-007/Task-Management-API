import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

type createUserInput = {
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly Prisma: PrismaService) {}

  async authfindUserbyEmail(email: string): Promise<boolean> {
    const user = await this.Prisma.user.findUnique({ where: { email } });
    if (!user) return true;
    return false;
  }

  async findUserbyId(userId: string): Promise<any> {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;

    return result;
  }

  async updatePassword(
    userId: string,
    oldPass: string,
    newPass: string,
  ): Promise<boolean> {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(oldPass, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid Password provided');

    const hashPass = await bcrypt.hash(newPass, 10);

    await this.Prisma.user.update({
      where: { id: userId },
      data: { password: hashPass },
    });

    return true;
  }
}
