import { IsNotEmpty, IsNumber, Min, NotEquals } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
    @ApiProperty({ example: 1, description: 'ID of the account to transfer from' })
    @IsNumber()
    @NotEquals('toAccountId', { message: 'fromAccountId and toAccountId must be different' })
    fromAccountId: number;

    @ApiProperty({ example: 2, description: 'ID of the account to transfer to' })
    @IsNumber()
    toAccountId: number;

    @ApiProperty({ example: 100, description: 'Amount to transfer' })
    @IsNumber()
    @Min(1)
    amount: number;
}