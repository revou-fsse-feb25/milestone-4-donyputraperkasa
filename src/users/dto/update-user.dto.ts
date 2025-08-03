import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({
        description: 'nama pemilik akun',
        example: 'dony putra',
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'email pemilik akun',
        example: 'dony@mail.com',
    })
    email?: string;

    @ApiPropertyOptional({
        description: 'password pemilik akun',
        example: 'dony123',
    })
    password?: string;
}