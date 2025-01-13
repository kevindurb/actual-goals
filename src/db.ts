import { Sequelize } from 'sequelize';

export const db = new Sequelize('sqlite:./database.sqlite');
