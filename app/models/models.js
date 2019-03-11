const Sequelize = require('sequelize');
const sequelize = require('../common/database.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.application = require('./application.model')(sequelize, SeQuelize);
db.appServer = require('./appServer.model')(sequelize, SeQuelize);
db.criticality = require('./criticality.model')(sequelize, SeQuelize);
db.middleware = require('./middelware.model')(sequelize, SeQuelize);
db.mssql = require('./mssql.model')(sequelize, SeQuelize);
db.oracle = require('./oracle.model')(sequelize, SeQuelize);
db.server = require('./server.model')(sequelize, SeQuelize);
db.user = require('./user.model')(sequelize, SeQuelize);

// links

db.middleware.belongsToMany(AppServers, {as: 'middlewares', through: 'middlewareAppServer'})
db.mssql.belongsToMany(AppServer, {as: 'mssqls', through: 'mssqlAppServer'})
db.oracle.belongsToMany(AppServer, {as: 'oracles', through: 'oracleAppServer'})
db.server.belongsToMany(AppServer, {as: 'server', through: 'serverAppServer'})
db.user.belongsToMany(Middleware, {as: 'certResponsibles', through: 'userMiddleware'})
db.user.belongsToMany(Application, {as: 'owner', through: 'userApplicationOwner'})
db.user.belongsToMany(Application, {as: 'support', through: 'userApplicationSupport'})

module.exports = db;