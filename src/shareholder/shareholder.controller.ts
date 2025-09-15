import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShareholderService } from './shareholder.service';
import { CreateShareholderDto } from './dto/create-shareholder.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Roles } from '../auth/decorators/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shareholder')
export class ShareholderController {
  constructor(private readonly shareholderService: ShareholderService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateShareholderDto) {
    return this.shareholderService.create(dto, dto.role);
  }
}
