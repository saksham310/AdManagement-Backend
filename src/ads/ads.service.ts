import { CreateAdDto } from './dto/create-ads.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from './entity/ads.entity';
import { Repository } from 'typeorm';
import { UpdateAdDto } from './dto/update-ads.dto';

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
    placement: string,
    bannerUrl?: string,
  ) {
    let ad = await this.findAd(group, app, page);

    if (!ad) {
      ad = this.adRepository.create({
        group,
        app,
        page,
        placement,
        bannerUrl,
        impressionCount: 1,
      });
    } else {
      ad.impressionCount += 1;
      if (bannerUrl) ad.bannerUrl = bannerUrl;
    }

    return this.adRepository.save(ad);
  }

  async findAdByGroup(group?: string): Promise<Ad[]> {
    if (!group) {
      return this.adRepository.find();
    }
    return this.adRepository.find({ where: { group } });
  }

  async createAd(dto: CreateAdDto): Promise<Ad> {
    const ad = this.adRepository.create({
      group: dto.group,
      app: dto.app,
      page: dto.page,
      placement: dto.placement,
      bannerUrl: dto.bannerUrl,
      impressionCount: dto.impressionCount ?? 0,
      status: dto.status ?? 'active',
    });
    return this.adRepository.save(ad);
  }

  async updateAd(id: string, dto: UpdateAdDto) {
    const ad = await this.adRepository.findOneBy({ id: id });
    if (!ad) {
      throw new Error(`Ad with id ${id} not found`);
    }

    Object.assign(ad, dto); // merge fields
    return this.adRepository.save(ad);
  }
}
