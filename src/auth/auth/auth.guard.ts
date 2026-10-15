import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from '../public/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const [tipo, token] = (request.headers.authorization?.split(' ') ?? []);
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token de autenticação ausente ou inválido');
    }
   
    try {
      (request as any).user = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Token de autenticação inválido');
    }
    



    return true;
  }
}
