const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/configBDD');

const Clients = sequelize.define('Clients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    adresse: {
        type: DataTypes.STRING
    },
    cp: {
        type: DataTypes.STRING
    },
    ville: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    telephone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

module.exports = Clients;
