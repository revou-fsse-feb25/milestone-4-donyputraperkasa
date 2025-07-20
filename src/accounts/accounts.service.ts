import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service'; // jika pakai Prisma

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAccountDto) {
    return this.prisma.account.create({ data });
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findOne(id: string) {
    return this.prisma.account.findUnique({ where: { id: parseInt(id, 10) } });
  }

  update(id: string, data: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id: parseInt(id, 10) },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.account.delete({ where: { id: parseInt(id, 10) } });
  }
}