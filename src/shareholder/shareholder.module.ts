import { Module } from '@nestjs/common';
import { ShareholderService } from './shareholder.service';
import { ShareholderController } from './shareholder.controller';
import { Shareholder } from './entities/shareholder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ShareholderController],
  imports: [
    TypeOrmModule.forFeature([Shareholder]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [ShareholderService],
  exports: [ShareholderService],
})
export class ShareholderModule {}
