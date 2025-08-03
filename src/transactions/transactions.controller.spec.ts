import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  const mockTransactionsService = {
    deposit: jest.fn().mockResolvedValue({ message: 'Deposit successful' }),
    withdraw: jest.fn().mockResolvedValue({ message: 'Withdraw successful' }),
    transfer: jest.fn().mockResolvedValue({ message: 'Transfer successful' }),
    getAll: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: mockTransactionsService,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call deposit method', async () => {
    const dto: DepositDto = { accountId: 1, amount: 1000 };
    const result = await controller.deposit(dto);
    expect(result).toEqual({ message: 'Deposit successful' });
    expect(service.deposit).toHaveBeenCalledWith(dto);
  });

  it('should call withdraw method', async () => {
    const dto: WithdrawDto = { accountId: 1, amount: 500 };
    const result = await controller.withdraw(dto);
    expect(result).toEqual({ message: 'Withdraw successful' });
    expect(service.withdraw).toHaveBeenCalledWith(dto);
  });

  it('should call transfer method', async () => {
    const dto: TransferDto = { fromAccountId: 1, toAccountId: 2, amount: 300 };
    const result = await controller.transfer(dto);
    expect(result).toEqual({ message: 'Transfer successful' });
    expect(service.transfer).toHaveBeenCalledWith(dto);
  });

  it('should return all transactions', async () => {
    const result = await controller.getAllTrasnsactions();
    expect(result).toEqual([]);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should return transaction by id', async () => {
    const result = await controller.getTransactionById(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getById).toHaveBeenCalledWith(1);
  });
});
