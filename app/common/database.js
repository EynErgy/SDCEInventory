const Sequelize = require('sequelize');

require('dotenv').config();

console.log(process.env.DBHOST);

var sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.DBPASSWORD, {
        host: process.env.DBHOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;