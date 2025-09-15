import { Controller } from '@nestjs/common';
import { ShareholderService } from './shareholder.service';

@Controller('shareholder')
export class ShareholderController {
  constructor(private readonly shareholderService: ShareholderService) {}
}
