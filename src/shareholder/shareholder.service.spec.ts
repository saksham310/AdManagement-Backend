import { Test, TestingModule } from '@nestjs/testing';
import { ShareholderService } from './shareholder.service';

describe('ShareholderService', () => {
  let service: ShareholderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareholderService],
    }).compile();

    service = module.get<ShareholderService>(ShareholderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
