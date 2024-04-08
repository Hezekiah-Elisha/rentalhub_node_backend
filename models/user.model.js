import { DataTypes } from 'sequelize';
import { sequelize } from "../Constants.js";


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
        allowNull: false,
        defaultValue: 'N/A'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
    }, {
    // options
});

export default User;