import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService]
})
export class InventoriesModule {}
