import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crate } from './crate.model';
import * as data from './data.json';

@Injectable()
export class CratesService {
  constructor(@InjectModel(Crate) private crateRepository: typeof Crate) {}

  async createCrates() {
    console.log('start');
    const tempRar = {
      'Армейское качество': 'rare',
      Запрещённое: 'mythical',
      Засекреченное: 'classified',
      Тайное: 'сovert',
    };
    for (let i = 0; i < data.length; i++) {
      if (data[i].contains.length !== 0 && data[i].type === 'Case') {
        await this.crateRepository.create({
          id: data[i].id,
          name: data[i].name,
          image: data[i].image,
          type: data[i].type,
          contains: [
            ...data[i].contains.map((item) => ({
              ...item,
              rarity: tempRar[item.rarity],
              price: Math.floor(Math.random() * 100000) + 1,
            })),
            ...data[i].contains_rare.map((item) => ({
              ...item,
              rarity: tempRar[item.rarity],
              price: Math.floor(Math.random() * 100000) + 1,
            })),
          ],
          price: Math.floor(Math.random() * 5000) + 1,
        });
        console.count(data.length + 'crates created');
      }
    }
    return 'SUCCESS';
  }

  async getAllCrates() {
    const crates = await this.crateRepository.findAll();
    return crates;
  }
}
