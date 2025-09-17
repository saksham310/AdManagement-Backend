import { PickType } from '@nestjs/mapped-types';
import { CreateAdDto } from './create-ads.dto';

export class ImpressionDto extends PickType(CreateAdDto, [
  'group',
  'app',
  'page',
  'placement',
  'bannerUrl',
] as const) {}
