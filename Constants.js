import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rental_hub', 'hezekiah', 'qwerty', {
    host: '127.0.0.1',
    dialect: 'mysql'
  });

export { sequelize };