import { Controller, Get, Post } from '@nestjs/common';
import { CratesService } from './crates.service';

@Controller('crates')
export class CratesController {
  constructor(private cratesRepository: CratesService) {}
  @Post('/add')
  create() {
    return this.cratesRepository.createCrates();
  }

  @Get('/get')
  getAll() {
    return this.cratesRepository.getAllCrates();
  }
}
