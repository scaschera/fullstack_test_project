// server/config/configBDD.js
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_backend'
})

const sequelize = new Sequelize('test_backend', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;