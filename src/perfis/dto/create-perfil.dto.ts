import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePerfilDto {
    @IsOptional()
    @IsString()
    telefone?: string;

    @IsOptional()
    @IsString()
    endereco?: string;

    @IsInt()
    usuarioId: number;
}