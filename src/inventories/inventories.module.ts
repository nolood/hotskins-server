import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Crate } from 'src/crates/crate.model';
import { UsersModule } from 'src/users/users.module';
import { InventoriesController } from './inventories.controller';
import { Inventory } from './inventories.model';
import { InventoriesService } from './inventories.service';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
  imports: [
    SequelizeModule.forFeature([Inventory, Crate]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class InventoriesModule {}
