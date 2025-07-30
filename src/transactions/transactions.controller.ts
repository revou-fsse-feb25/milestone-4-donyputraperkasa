import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  deposit(@Body() dto: DepositDto) {
    return this.service.deposit(dto);
  }

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  withdraw(@Body() dto: WithdrawDto) {
    return this.service.withdraw(dto);
  }

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  transfer(@Body() dto: TransferDto) {
    return this.service.transfer(dto);
  }
}