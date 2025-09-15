import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { type ShareholderRole } from '../entities/shareholder.entity';

export class CreateShareholderDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  role?: ShareholderRole;
}
