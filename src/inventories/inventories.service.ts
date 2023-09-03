import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './inventories.model';

@Injectable()
export class InventoriesService {
  constructor(@InjectModel(Inventory) private inventoryRepository: typeof Inventory) {}
}
