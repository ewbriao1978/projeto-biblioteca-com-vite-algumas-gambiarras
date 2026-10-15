import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory:  (config: ConfigService) => ({
        
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
        
  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AuthModule {}
