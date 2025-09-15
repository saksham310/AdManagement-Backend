import { Module } from '@nestjs/common';
import { ShareholderService } from './shareholder.service';
import { ShareholderController } from './shareholder.controller';
import { Shareholder } from './entities/shareholder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShareholderController],
  imports: [TypeOrmModule.forFeature([Shareholder])],
  providers: [ShareholderService],
  exports: [ShareholderService],
})
export class ShareholderModule {}
