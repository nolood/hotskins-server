import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface UserCreationAttributes {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true })
  username: string;
  @Column({ type: DataTypes.STRING })
  password: string;
  @Column({ type: DataTypes.INTEGER })
  inventory: number;
  @Column({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 1000 })
  balance: number;
  @Column({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 })
  rating: number;
}
