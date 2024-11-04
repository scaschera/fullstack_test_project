const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/configBDD');

const BonsReduction = sequelize.define('BonsReduction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    reduction: {
        type: DataTypes.FLOAT
    },
    type: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }

});

module.exports = BonsReduction;
