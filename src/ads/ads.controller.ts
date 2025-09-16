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
      placement: string;
      bannerUrl?: string;
    },
  ) {
    const { group, app, page, bannerUrl, placement } = body;
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
}
