import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRole } from '../../user/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
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
      console.log(payload);
      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired'); // explicitly expired
      }
      throw new UnauthorizedException('Invalid token'); // anything else
    }
  }
}
