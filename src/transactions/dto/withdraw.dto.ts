import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
    @ApiProperty({ example: 123, description: 'The ID of the account to withdraw from' })
    @IsNumber()
    @IsNotEmpty()
    accountId: number;

    @ApiProperty({ example: 100, description: 'The amount of money to withdraw' })
    @IsNumber()
    @Min(1)
    amount: number;
}