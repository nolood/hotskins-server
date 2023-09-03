import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface UserCreationAttributes {
  username: string;
  password: string;
  inventory: number;
}

@Table({ tableName: 'users' })
export class Inventory extends Model<Inventory, UserCreationAttributes> {
  @Column({ type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  password: string;
  @Column({ type: DataTypes.INTEGER, unique: true, allowNull: false })
  inventory: number;
  @Column({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 1000 })
  balance: number;
  @Column({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 })
  rating: number;
}
