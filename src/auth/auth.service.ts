import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }


    // service method to register a new user
    async register(dto: RegisterDto) {
        // check if user already exists
        const existingUser = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(dto.senha, 10);

        const newUser = await this.prisma.usuario.create({
            data: {
                nome: dto.nome,
                email: dto.email,
                senha: hashedPassword,
            },
        });
        return { message: 'Usuario cadastrado com sucesso', id: newUser.id, nome: newUser.nome, email: newUser.email };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas: usuário não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(dto.senha, user.senha);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas: senha incorreta');
        }

        const token = await this.jwtService.signAsync({ sub: user.id, email: user.email });

        return { access_token: token };

    }    
}
