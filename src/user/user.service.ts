import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async create(
    payload: CreateUserDto,
    role: UserRole = 'advertiser',
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const shareholder = this.userRepo.create({
      ...payload,
      passwordHash,
      role,
    });
    return this.userRepo.save(shareholder);
  }
}
