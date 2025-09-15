import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ad } from './entity/ads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [AdsService],
  controllers: [AdsController],
  imports: [TypeOrmModule.forFeature([Ad]), AuthModule],
})
export class AdsModule {}
