import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shareholder, ShareholderRole } from './entities/shareholder.entity';
import { Repository } from 'typeorm';
import { CreateShareholderDto } from './dto/create-shareholder.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ShareholderService {
  constructor(
    @InjectRepository(Shareholder)
    private readonly shareholderRepo: Repository<Shareholder>,
  ) {}

  async findByEmail(email: string): Promise<Shareholder | null> {
    return this.shareholderRepo.findOne({ where: { email } });
  }

  async create(
    payload: CreateShareholderDto,
    role: ShareholderRole = 'shareholder',
  ): Promise<Shareholder> {
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const shareholder = this.shareholderRepo.create({ ...payload, passwordHash, role });
    return this.shareholderRepo.save(shareholder);
  }
}
