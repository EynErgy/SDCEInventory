const Sequelize = require('sequelize');
const sequelize = require('../common/database.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.application = require('./application.model')(sequelize, Sequelize);
db.criticality = require('./criticality.model')(sequelize, Sequelize);
db.middleware = require('./middelware.model')(sequelize, Sequelize);
db.mssql = require('./mssql.model')(sequelize, Sequelize);
db.oracle = require('./oracle.model')(sequelize, Sequelize);
db.server = require('./server.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);

// links

// one database instance belong to one server, one server can have multiple database instances
db.server.hasMany(db.mssql, {as: 'MSSQLs'})
db.server.hasMany(db.oracle, {as: 'Oracles'})
db.server.hasMany(db.middleware, {as: 'Middlewares'})
db.mssql.belongsTo(db.server)
db.oracle.belongsTo(db.server)
db.middleware.belongsTo(db.server)

// Application has one criticality
db.criticality.hasMany(db.application, {as: 'Applications'})
db.application.belongsTo(db.criticality)


// Users are present in multiples places
db.user.belongsToMany(db.middleware, {as: 'MiddlewareResponsibles', through: 'userMiddleware'})
db.middleware.belongsToMany(db.user, {as: 'CertResponsibles', through: 'userMiddleware'})
db.user.belongsToMany(db.application, {as: 'ApplicationOwners', through: 'userApplicationOwner'})
db.application.belongsToMany(db.user, {as: 'Owners', through: 'userApplicationOwner'})
db.user.belongsToMany(db.application, {as: 'ApplicationSupports', through: 'userApplicationSupport'})
db.application.belongsToMany(db.user, {as: 'Supports', through: 'userApplicationSupport'})

// AppServer has multiple MW, ORACLE and MSSQL but one server
//db.appServer.hasOne(db.server, {as: 'Server'})
db.application.belongsToMany(db.middleware, {as: 'Middlewares', through: 'applicationMiddleware'})
db.application.belongsToMany(db.mssql, {as: 'MSSQLs', through: 'applicationMssql'})
db.application.belongsToMany(db.oracle, {as: 'Oracles', through: 'applicationOracle'})
db.middleware.belongsToMany(db.application, {as: 'MWApplications', through: 'applicationMiddleware'})
db.mssql.belongsToMany(db.application, {as: 'MSSQLApplications', through: 'applicationMssql'})
db.oracle.belongsToMany(db.application, {as: 'OraclesApplications', through: 'applicationOracle'})

module.exports = db;