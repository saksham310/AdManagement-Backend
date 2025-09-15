import { Test, TestingModule } from '@nestjs/testing';
import { ShareholderController } from './shareholder.controller';
import { ShareholderService } from './shareholder.service';

describe('ShareholderController', () => {
  let controller: ShareholderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareholderController],
      providers: [ShareholderService],
    }).compile();

    controller = module.get<ShareholderController>(ShareholderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
