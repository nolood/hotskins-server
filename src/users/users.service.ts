import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crate } from 'src/crates/crate.model';
import { Inventory } from 'src/inventories/inventories.model';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Inventory) private inventoryRepository: typeof Inventory,
    @InjectModel(Crate) private crateRepository: typeof Crate,
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const inventory = await this.inventoryRepository.create({ userId: user.id });
    await user.update({ inventory: inventory.id });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async openCrate(userId: number, crateId: string) {
    const crate = await this.crateRepository.findOne({ where: { id: crateId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user.balance >= crate.price) {
      await user.update({ balance: user.balance - crate.price });
    } else {
      throw new HttpException('Недостаточно средств', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return user;
  }

  async sellSkin(userId: number, crateId: string, skinId: string) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: userId },
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const crate = await this.crateRepository.findOne({
      where: { id: crateId },
    });
    const skin = crate.contains.find((item) => item.id === skinId);

    if (!skin) {
      throw new HttpException('Скин не найден', HttpStatus.NOT_FOUND);
    }

    const isHaveSkin = !!inventory.items.find((item) => item.id === skinId);

    if (!isHaveSkin) {
      throw new HttpException('У вас нет этого скина', HttpStatus.NOT_FOUND);
    }

    await inventory.update({
      summary: inventory.summary - skin.price,
      items: inventory.items.filter((item) => item.id !== skinId),
    });

    await user.update({
      balance: user.balance + skin.price,
    });
  }
}
