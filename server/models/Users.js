const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/configBDD');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    droit: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

module.exports = Users;
