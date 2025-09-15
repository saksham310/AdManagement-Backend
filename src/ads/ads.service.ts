import { Injectable } from '@nestjs/common';
import { Ad } from './entity/ads.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,
  ) {}

  async findAd(group: string, app: string, page: string): Promise<Ad | null> {
    return this.adRepository.findOne({ where: { group, app, page } });
  }

  async incrementImpression(
    group: string,
    app: string,
    page: string,
    bannerUrl?: string,
  ) {
    let ad = await this.findAd(group, app, page);

    if (!ad) {
      ad = this.adRepository.create({
        group,
        app,
        page,
        bannerUrl,
        impressionCount: 1,
      });
    } else {
      ad.impressionCount += 1;
      if (bannerUrl) ad.bannerUrl = bannerUrl;
    }

    return this.adRepository.save(ad);
  }

  async findAdByGroup(group: string | undefined): Promise<Ad[]> {
    if (!group) {
      // Admin: fetch all ads
      return this.adRepository.find();
    }
    return this.adRepository.find({ where: { group } });
  }
}
