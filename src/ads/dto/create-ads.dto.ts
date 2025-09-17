import { IsString, IsOptional, IsIn, IsInt, Min } from 'class-validator';

export class CreateAdDto {
  @IsString()
  group: string;

  @IsString()
  app: string;

  @IsString()
  page: string;

  @IsString()
  placement: string;

  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  impressionCount?: number = 0;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive' = 'active';
}
