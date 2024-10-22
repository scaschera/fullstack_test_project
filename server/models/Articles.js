const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/configBDD');

const Articles = sequelize.define('Articles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT
    },
    qte: {
        type: DataTypes.INTEGER
    },
    url_img: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

module.exports = Articles;
