import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Crate } from 'src/crates/crate.model';
import { Inventory } from 'src/inventories/inventories.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Inventory, Crate]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
