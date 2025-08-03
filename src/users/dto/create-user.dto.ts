import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'dony putra', description: 'nama pemilik akun' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'dony@mail.com', description: 'email pemilik akun' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'dony123', description: 'password pemilik akun' })
    @IsString()
    @MinLength(6)
    password: string;
}