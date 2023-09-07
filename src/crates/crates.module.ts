import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Crate } from './crate.model';
import { CratesController } from './crates.controller';
import { CratesService } from './crates.service';

@Module({
  controllers: [CratesController],
  providers: [CratesService],
  imports: [SequelizeModule.forFeature([Crate]), forwardRef(() => AuthModule)],
})
export class CratesModule {}
