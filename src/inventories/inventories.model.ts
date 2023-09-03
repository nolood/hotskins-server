import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface InventoryCreationAttributes {
  userId: number;
}

@Table({ tableName: 'inventories' })
export class Inventory extends Model<Inventory, InventoryCreationAttributes> {
  @Column({ type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataTypes.INTEGER, unique: true })
  userId: number;
  @Column({ type: DataTypes.STRING })
  items: string;
  @Column({ type: DataTypes.INTEGER, defaultValue: 0 })
  count: number;
  @Column({ type: DataTypes.INTEGER, defaultValue: 0 })
  summary: number;
}
