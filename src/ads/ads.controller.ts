import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { JwtAuthGuard, type TokenRequest } from '../auth/guards/jwt.auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async postImpression(
    @Body()
    body: {
      group: string;
      app: string;
      page: string;
      bannerUrl?: string;
    },
  ) {
    const { group, app, page, bannerUrl } = body;
    return this.adsService.incrementImpression(group, app, page, bannerUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get('group')
  async getAdsByGroup(@Req() req: TokenRequest) {
    const group = req.user?.group;
    return this.adsService.findAdByGroup(group);
  }
}
