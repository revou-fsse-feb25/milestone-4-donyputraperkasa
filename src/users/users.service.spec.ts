import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('harus berhasil membuat user baru', async () => {
    const dummyUser = { 
      id: 1, 
      name: 'dony putra', 
      email: 'dony@mail.com', 
      password: await bcrypt.hash('dony123', 10), 
      role: Role.USER, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    prismaMock.user.create.mockResolvedValue(dummyUser);

    const result = await service.create({ name: 'John Doe', email: 'john@example.com', password: 'secret' });

    expect(result).toEqual(dummyUser);
    expect(prismaMock.user.create).toHaveBeenCalled();
  });

  it('harus mengembalikan daftar semua user', async () => {
    const dummyUsers = [
      { 
        id: 1, 
        name: 'dony putra', 
        email: 'dony@mail.com', 
        role: Role.USER, 
        createdAt: new Date() 
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(dummyUsers);

    const result = await service.findAll();

    expect(result).toEqual(dummyUsers);
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  it('harus gagal jika email sudah digunakan', async () => {
    prismaMock.user.create.mockRejectedValue({
      code: 'P2002', // Prisma unique constraint error code
    });

    await expect(
      service.create({ name: 'Dony', email: 'dony@mail.com', password: 'dony123' }),
    ).rejects.toThrow('Email already exists');
  });
});
