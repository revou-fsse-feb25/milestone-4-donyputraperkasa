import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    email: 'dony@mail.com',
    password: bcrypt.hashSync('dony123', 10),
    role: 'user',
  };

  const mockUsersService = {
    findByEmail: jest.fn().mockResolvedValue(mockUser),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return access_token on valid login', async () => {
    const result = await service.login({ email: 'dony@mail.com', password: 'dony123' });
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('should throw UnauthorizedException on invalid password', async () => {
    await expect(
      service.login({ email: 'dony@mail.com', password: 'wrongpassword' }),
    ).rejects.toThrow();
  });
});
