import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WithdrawDto {
    @IsNumber()
    @IsNotEmpty()
    accountId: number;

    @IsNumber()
    @Min(1)
    amount: number;
}