import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prisma: PrismaService;

  const mockPrisma = {
    account: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transfer successfully if balance is enough', async () => {
    const sender = { id: 1, balance: 1000 };
    const receiver = { id: 2, balance: 500 };
    const amount = 200;

    mockPrisma.account.findUnique
      .mockImplementationOnce(() => sender)
      .mockImplementationOnce(() => receiver);
    mockPrisma.account.update.mockResolvedValue({});
    mockPrisma.transaction.create.mockResolvedValue({});
    mockPrisma.$transaction.mockResolvedValue({ message: 'Transfer successful' });

    const result = await service.transfer({
      fromAccountId: sender.id,
      toAccountId: receiver.id,
      amount,
    });

    expect(mockPrisma.account.findUnique).toHaveBeenCalledTimes(2);
    expect(mockPrisma.account.update).toHaveBeenCalledTimes(2);
    expect(mockPrisma.transaction.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: 'Transfer successful' });
  });

  it('should throw an error if balance is insufficient', async () => {
    const sender = { id: 1, balance: 100 };
    const receiver = { id: 2, balance: 500 };
    const amount = 200;

    mockPrisma.account.findUnique
      .mockImplementationOnce(() => sender)
      .mockImplementationOnce(() => receiver);

    await expect(
      service.transfer({
        fromAccountId: sender.id,
        toAccountId: receiver.id,
        amount,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(mockPrisma.account.findUnique).toHaveBeenCalledTimes(2);
    expect(mockPrisma.account.update).not.toHaveBeenCalled();
    expect(mockPrisma.transaction.create).not.toHaveBeenCalled();
  });
});
