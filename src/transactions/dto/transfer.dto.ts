import { IsNotEmpty, IsNumber, Min, NotEquals } from 'class-validator';

export class TransferDto {
    @IsNumber()
    @NotEquals('toAccountId', { message: 'fromAccountId and toAccountId must be different' })
    fromAccountId: number;

    @IsNumber()
    toAccountId: number;

    @IsNumber()
    @Min(1)
    amount: number;
}