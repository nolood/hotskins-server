import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Crate } from './crate.model';
import { CratesController } from './crates.controller';
import { CratesService } from './crates.service';

@Module({
  controllers: [CratesController],
  providers: [CratesService],
  imports: [SequelizeModule.forFeature([Crate])],
})
export class CratesModule {}
