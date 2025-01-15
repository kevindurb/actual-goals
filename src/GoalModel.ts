import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize';
import { db } from './db.ts';

export class GoalModel extends Model<
  InferAttributes<GoalModel>,
  InferCreationAttributes<GoalModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: 'MONTHLY' | 'ONE_TIME';
  declare amount: number;
  declare start: Date | null;
  declare end: Date | null;
}

GoalModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.TEXT,
    type: DataTypes.ENUM('MONTHLY', 'ONE_TIME'),
    amount: DataTypes.DECIMAL,
    start: { type: DataTypes.DATE, allowNull: true },
    end: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: db,
    modelName: 'Goal',
  },
);

export type Goal = InferAttributes<GoalModel>;
