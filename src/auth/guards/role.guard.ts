import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JwtPayload, TokenRequest } from './jwt.auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true; // no roles required

    const req = context.switchToHttp().getRequest<TokenRequest>();
    const user: JwtPayload | undefined = req.user;

    if (!user) return false; // no user attached

    return requiredRoles.includes(user.role);
  }
}
