import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { User } from 'src/generated/prisma/client.js';

type createUserInput = {
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly Prisma: PrismaService) {}

  async createUser(value: createUserInput): Promise<any> {
    const existingUser = await this.Prisma.user.findUnique({
      where: { email: value.email },
    });

    if (!existingUser)
      throw new ConflictException('Provided Email already exists');

    const hashedPassword = await bcrypt.hash(value.password, 10);

    await this.Prisma.user.create({
      data: {
        fullName: value.fullName,
        email: value.email,
        password: hashedPassword,
        phoneNo: value.phoneNo,
      },
    });
  }

  async updateRefresh(userId: string, token: string): Promise<any> {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const hashToken = await bcrypt.hash(token, 10);

    await this.Prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashToken },
    });
  }

  async findUserbyEmail(email: string): Promise<User> {
    const user = await this.Prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserbyId(userId: string): Promise<any> {
    const user = await this.Prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;

    return result;
  }
}
