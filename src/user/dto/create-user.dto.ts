import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { type UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  group?: string;
}
