import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // bagian deposit
  async deposit(dto: DepositDto) {
    await this.prisma.account.update({
      where: { id: dto.accountId },
      data: { balance: { increment: dto.amount } },
    });
    return this.prisma.transaction.create({
      data: {
        accountsId: dto.accountId,
        Type: TransactionType.DEPOSIT,
        description: `Deposit of ${dto.amount}`,
      },
    });
  }

  // bagian withdraw
  async withdraw(dto: WithdrawDto) {
    const account = await this.prisma.account.findUnique({ where: { id: dto.accountId } });
    if (!account || account.balance < dto.amount) {
      throw new BadRequestException('Insufficient funds');
    }
    await this.prisma.account.update({
      where: { id: dto.accountId },
      data: { balance: { decrement: dto.amount } },
    });
    return this.prisma.transaction.create({
      data: {
        accountsId: dto.accountId,
        Type: TransactionType.WITHDRAW,
        description: `Withdraw of ${dto.amount}`,
      },
    });
  }

  // bagian transfer
  async transfer(dto: TransferDto) {
    if (dto.fromAccountId === dto.toAccountId) {
      throw new BadRequestException('Cannot transfer to the same account');
    }
    const from = await this.prisma.account.findUnique({ where: { id: dto.fromAccountId } });
    if (!from || from.balance < dto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: dto.fromAccountId },
        data: { balance: { decrement: dto.amount } },
      }),
      this.prisma.account.update({
        where: { id: dto.toAccountId },
        data: { balance: { increment: dto.amount } },
      }),
      this.prisma.transaction.create({
        data: {
          accountsId: dto.fromAccountId,
          Type: TransactionType.TRANSFER,
          description: `Transfer to account ${dto.toAccountId} of ${dto.amount}`,
        },
      }),
    ]);

    return { message: 'Transfer successful' };
  }
}