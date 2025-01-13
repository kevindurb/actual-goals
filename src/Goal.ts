import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize';
import { db } from './db.ts';

export class Goal extends Model<
  InferAttributes<Goal>,
  InferCreationAttributes<Goal>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Goal.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.TEXT,
  },
  {
    sequelize: db,
    modelName: 'Goal',
  },
);
