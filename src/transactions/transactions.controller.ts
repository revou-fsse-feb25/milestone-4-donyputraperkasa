import { Controller, Post,Get, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  @ApiOperation({ summary: 'Deposit to an account' })
  @ApiResponse({ status: 201, description: 'Deposit successful' })
  deposit(@Body() dto: DepositDto) {
    return this.service.deposit(dto);
  }

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  @ApiOperation({ summary: 'Withdraw from an account' })
  @ApiResponse({ status: 201, description: 'Withdraw successful' })
  withdraw(@Body() dto: WithdrawDto) {
    return this.service.withdraw(dto);
  }

  // harus ada guard disini
  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  @ApiOperation({ summary: 'Transfer funds between accounts' })
  @ApiResponse({ status: 201, description: 'Transfer successful' })
  transfer(@Body() dto: TransferDto) {
    return this.service.transfer(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'List of transactions' })
  getAllTrasnsactions(){
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction details' })
  getTransactionById(@Param('id', ParseIntPipe) id: number){
    return this.service.getById(id);
  }
}