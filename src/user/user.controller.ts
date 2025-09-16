import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Roles } from '../auth/decorators/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly shareholderService: UserService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.shareholderService.create(dto, dto.role);
  }
}
