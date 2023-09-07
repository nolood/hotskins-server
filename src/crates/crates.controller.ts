import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CratesService } from './crates.service';

@Controller('crates')
export class CratesController {
  constructor(private cratesRepository: CratesService) {}
  @Post('/add')
  create() {
    return this.cratesRepository.createCrates();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  getAll() {
    return this.cratesRepository.getAllCrates();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getCrateById(@Param('id') id: string) {
    return this.cratesRepository.getCrateById(id);
  }
}
