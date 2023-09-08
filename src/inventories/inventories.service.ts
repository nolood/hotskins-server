import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crate } from 'src/crates/crate.model';
import { Inventory } from './inventories.model';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory) private inventoryRepository: typeof Inventory,
    @InjectModel(Crate) private crateRepository: typeof Crate,
  ) {}
  async addSkin(userId: number, crateId: string, skinId: string) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: userId },
    });
    const crate = await this.crateRepository.findOne({
      where: { id: crateId },
    });
    const skin = crate.contains.find((item) => item.id === skinId);

    if (!skin || !crate) {
      throw new HttpException('Не найден контейнер или скин', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (inventory.items.find((item) => item.id === skinId)) {
      inventory.update({
        items: inventory.items.map((item) => {
          if (item.id === skinId) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        }),
      });
    } else {
      inventory.update({
        items: [...inventory.items, { ...skin, count: 1, crate: crateId }],
      });
    }

    return inventory;
  }

  async getInventory(userId: number) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: userId },
    });

    await inventory.update({
      count: inventory.items.reduce((acc, item) => acc + item.count, 0),
      summary: inventory.items.reduce((acc, item) => acc + item.price * item.count, 0),
    });

    return inventory;
  }
}
