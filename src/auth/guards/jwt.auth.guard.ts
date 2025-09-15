import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ShareholderRole } from '../../shareholder/entities/shareholder.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  role: ShareholderRole;
  group?: string;
  iat?: number;
  exp?: number;
}

export interface TokenRequest extends Request {
  user?: JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<TokenRequest>();
    const authHeader = req.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
