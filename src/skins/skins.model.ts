import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'skins' })
export class Skin extends Model<Skin> {
  @Column({ type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string;
  @Column({ type: DataTypes.STRING })
  description: string;
  @Column({ type: DataTypes.STRING })
  weapon: string;
  @Column({ type: DataTypes.STRING })
  pattern: string;
  @Column({ type: DataTypes.INTEGER })
  minFloat: number;
  @Column({ type: DataTypes.INTEGER })
  maxFloat: number;
  @Column({ type: DataTypes.BOOLEAN })
  stattrak: boolean;
  @Column({ type: DataTypes.STRING })
  image: string;
}
