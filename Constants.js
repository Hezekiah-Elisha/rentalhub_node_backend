import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rental_hub', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
  });

export { sequelize };