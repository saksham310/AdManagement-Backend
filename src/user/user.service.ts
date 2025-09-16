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
    private readonly shareholderRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.shareholderRepo.findOne({ where: { email } });
  }

  async create(
    payload: CreateUserDto,
    role: UserRole = 'advertiser',
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const shareholder = this.shareholderRepo.create({
      ...payload,
      passwordHash,
      role,
    });
    return this.shareholderRepo.save(shareholder);
  }
}
