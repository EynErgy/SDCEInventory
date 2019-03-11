module.exports = (sequelize, Sequelize) => {
    const Mssql = sequelize.define('mssql', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        bch: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Business critical hours"
        },
        dbName: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Database Name"
        },
        environment: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Production, Test or Acceptance"
        },
        appAccount:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Application account"
        },
        dbJobs: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Database Jobs"
        },
        knowedIssues: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Knowed issues"
        },
        frequenRequests: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Frequent Requests"
        },
        specificities: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Specificities"
        }
    });

   

    return Mssql;
}