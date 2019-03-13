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

db.middleware.belongsToMany(db.appServer, {as: 'MWServers', through: 'middlewareAppServer'})
db.appServer.belongsToMany(db.middleware, {as: 'Middlewsares', through: 'middlewareAppServer'})
db.mssql.belongsToMany(db.appServer, {as: 'MSSQLServers', through: 'mssqlAppServer'})
db.appServer.belongsToMany(db.mssql, {as: 'MSSQLs', through: 'mssqlAppServer'})
db.oracle.belongsToMany(db.appServer, {as: 'OracleServers', through: 'oracleAppServer'})
db.appServer.belongsToMany(db.oracle, {as: 'Oracles', through: 'oracleAppServer'})
db.server.belongsToMany(db.appServer, {as: 'AppServers', through: 'serverAppServer'})
db.appServer.belongsToMany(db.server, {as: 'Servers', through: 'serverAppServer'})
db.user.belongsToMany(db.middleware, {as: 'MiddlewareResponsibles', through: 'userMiddleware'})
db.middleware.belongsToMany(db.user, {as: 'CertResponsibles', through: 'userMiddleware'})
db.user.belongsToMany(db.application, {as: 'ApplicationOwners', through: 'userApplicationOwner'})
db.application.belongsToMany(db.user, {as: 'Owners', through: 'userApplicationOwner'})
db.user.belongsToMany(db.application, {as: 'ApplicationSupports', through: 'userApplicationSupport'})
db.application.belongsToMany(db.user, {as: 'Supports', through: 'userApplicationSupport'})

module.exports = db;