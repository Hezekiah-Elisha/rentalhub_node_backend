import { DataTypes } from 'sequelize';
import { sequelize } from "../Constants.js";
import User from './user.model.js';

// table properties
const Property = sequelize.define('properties', {
    // attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    features: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    }, {
    // options
});

Property.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
User.hasMany(Property, {foreignKey: 'userId', targetKey: 'id'});

export default Property;