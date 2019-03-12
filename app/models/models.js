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

db.middleware.belongsToMany(db.appServer, {as: 'middlewares', through: 'middlewareAppServer'})
db.mssql.belongsToMany(db.appServer, {as: 'mssqls', through: 'mssqlAppServer'})
db.oracle.belongsToMany(db.appServer, {as: 'oracles', through: 'oracleAppServer'})
db.server.belongsToMany(db.appServer, {as: 'server', through: 'serverAppServer'})
db.user.belongsToMany(db.middleware, {as: 'certResponsibles', through: 'userMiddleware'})
db.user.belongsToMany(db.application, {as: 'owner', through: 'userApplicationOwner'})
db.user.belongsToMany(db.application, {as: 'support', through: 'userApplicationSupport'})

module.exports = db;