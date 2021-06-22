import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserAService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUser(param: { id?: number; email?: string }) {
    const { id, email } = param;
    if (id) {
      return this.prisma.user.findUnique({ where: { id } });
    } else if (email) {
      return this.prisma.user.findUnique({ where: { email } });
    }
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async changePassword(email: string, password: string) {
    // return await prisma
    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }
}
