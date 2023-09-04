import { Module } from '@nestjs/common';
import { CratesController } from './crates.controller';
import { CratesService } from './crates.service';

@Module({
  controllers: [CratesController],
  providers: [CratesService]
})
export class CratesModule {}
