import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'creates' })
export class Crate extends Model<Crate> {
  @Column({ type: DataTypes.STRING, unique: true })
  id: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string;
  @Column({ type: DataTypes.STRING })
  type: string;
  @Column({ type: DataTypes.ARRAY(DataTypes.JSON) })
  contains: Array<{ id: string; name: string; rarity: string; image: string }>;
  @Column({ type: DataTypes.STRING })
  image: string;
}
