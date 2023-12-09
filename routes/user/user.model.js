import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('rental_hub', 'hezekiah', 'qwerty', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// table users
const User = sequelize.define('users', {
    // attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    // options
});

export default User;