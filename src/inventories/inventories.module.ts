import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoriesController } from './inventories.controller';
import { Inventory } from './inventories.model';
import { InventoriesService } from './inventories.service';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
  imports: [SequelizeModule.forFeature([Inventory])],
})
export class InventoriesModule {}
