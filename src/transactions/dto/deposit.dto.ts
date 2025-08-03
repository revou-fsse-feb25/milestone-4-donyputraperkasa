import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
    @ApiProperty({ example: 123, description: 'The ID of the account to deposit into' })
    @IsNumber()
    @IsNotEmpty()
    accountId: number;

    @ApiProperty({ example: 100, description: 'The amount of money to deposit' })
    @IsNumber()
    @Min(1)
    amount: number;
}