const Sequelize = require('sequelize');

require('dotenv').config();

console.log(process.env.DBHOST);

let dialect = 'mysql';
if (process.env.NODE_ENV == 'production'){
    dialect= 'mssql';
}

var sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.DBPASSWORD, {
        host: process.env.DBHOST,
        dialect: dialect
    }
);

module.exports = sequelize;