import { SetMetadata } from '@nestjs/common';
import { ShareholderRole } from '../../shareholder/entities/shareholder.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ShareholderRole[]) =>
  SetMetadata(ROLES_KEY, roles);
