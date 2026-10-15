import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { PerfisModule } from './perfis/perfis.module.js';
import { LivrosModule } from './livros/livros.module.js';
import { EmprestimosModule } from './emprestimos/emprestimos.module.js';
import { RelatoriosModule } from './relatorios/relatorios.module.js';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  PrismaModule,
  AuthModule,
  UsuariosModule,
  PerfisModule,
  LivrosModule,
  EmprestimosModule,
  RelatoriosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
