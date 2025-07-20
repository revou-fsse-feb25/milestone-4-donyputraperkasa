import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class DepositDto {
    @IsNumber()
    @IsNotEmpty()
    accountId: number;

    @IsNumber()
    @Min(1)
    amount: number;
}