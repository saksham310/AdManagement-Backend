import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { JwtAuthGuard, type TokenRequest } from '../auth/guards/jwt.auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { CreateAdDto } from './dto/create-ads.dto';
import { ImpressionDto } from './dto/create-impression.dto';
import { UpdateAdDto } from './dto/update-ads.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async postImpression(@Body() body: ImpressionDto) {
    const { group, app, page, placement, bannerUrl } = body;
    return this.adsService.incrementImpression(
      group,
      app,
      page,
      placement,
      bannerUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('group')
  async getAdsByGroup(@Req() req: TokenRequest) {
    const group = req.user?.group;
    return this.adsService.findAdByGroup(group);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('new')
  async newAds(@Body() dto: CreateAdDto) {
    return this.adsService.createAd(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  async updateAd(@Param('id') id: string, @Body() dto: UpdateAdDto) {
    return this.adsService.updateAd(id, dto);
  }
}
