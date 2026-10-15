import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service.js';
import { LivrosController } from './livros.controller.js';

@Module({
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
