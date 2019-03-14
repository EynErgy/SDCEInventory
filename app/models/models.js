const Sequelize = require('sequelize');
const sequelize = require('../common/database.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.application = require('./application.model')(sequelize, Sequelize);
db.appServer = require('./appServer.model')(sequelize, Sequelize);
db.criticality = require('./criticality.model')(sequelize, Sequelize);
db.middleware = require('./middelware.model')(sequelize, Sequelize);
db.mssql = require('./mssql.model')(sequelize, Sequelize);
db.oracle = require('./oracle.model')(sequelize, Sequelize);
db.server = require('./server.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);

// links
/*
db.middleware.belongsToMany(db.appServer, {as: 'MWServers', through: 'middlewareAppServer'})
db.appServer.belongsToMany(db.middleware, {as: 'Middlewsares', through: 'middlewareAppServer'})
db.mssql.belongsToMany(db.appServer, {as: 'MSSQLServers', through: 'mssqlAppServer'})
db.appServer.belongsToMany(db.mssql, {as: 'MSSQLs', through: 'mssqlAppServer'})
db.oracle.belongsToMany(db.appServer, {as: 'OracleServers', through: 'oracleAppServer'})
db.appServer.belongsToMany(db.oracle, {as: 'Oracles', through: 'oracleAppServer'})
db.server.belongsToMany(db.appServer, {as: 'AppServers', through: 'serverAppServer'})
db.appServer.belongsToMany(db.server, {as: 'Servers', through: 'serverAppServer'})
*/
// one server can have multiple MW and one MW can be installed on multiple Servers
db.server.belongsToMany(db.middleware, {as: 'MiddlewareServers', through: 'serverMiddleware'})
db.middleware.belongsToMany(db.server, {as: 'Servers', through: 'serverMiddleware'})
// one database instance belong to one server, one server can have multiple database instances
db.server.hasMany(db.mssql, {as: 'MSSQLs'})
db.server.hasMany(db.oracle, {as: 'Oracles'})
db.mssql.belongsTo(db.server)
db.oracle.belongsTo(db.server)

// Users are present in multiples places
db.user.belongsToMany(db.middleware, {as: 'MiddlewareResponsibles', through: 'userMiddleware'})
db.middleware.belongsToMany(db.user, {as: 'CertResponsibles', through: 'userMiddleware'})
db.user.belongsToMany(db.application, {as: 'ApplicationOwners', through: 'userApplicationOwner'})
db.application.belongsToMany(db.user, {as: 'Owners', through: 'userApplicationOwner'})
db.user.belongsToMany(db.application, {as: 'ApplicationSupports', through: 'userApplicationSupport'})
db.application.belongsToMany(db.user, {as: 'Supports', through: 'userApplicationSupport'})

// AppServer has multiple MW, ORACLE and MSSQL but one server
db.appServer.hasOne(db.server, {as: 'Server'})
db.appServer.belongsToMany(db.middleware, {as: 'Middlewares', through: 'appServerMiddleware'})
db.appServer.belongsToMany(db.mssql, {as: 'MSSQLs', through: 'appServerMssql'})
db.appServer.belongsToMany(db.oracle, {as: 'Oracles', through: 'appServerOracle'})
db.middleware.belongsToMany(db.appServer, {as: 'MWAppServers', through: 'appServerMiddleware'})
db.mssql.belongsToMany(db.appServer, {as: 'MSSQLAppServers', through: 'appServerMssql'})
db.oracle.belongsToMany(db.appServer, {as: 'OraclesAppServers', through: 'appServerOracle'})

module.exports = db;