module.exports = (sequelize, Sequelize) => {
    const Middleware = sequelize.define('middleware', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        mwName: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "MW Name"
        },
        startRequirements: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Boot time requirements"
        },
        nonStdConfig: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Non standard configurations"
        },
        dataPath: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Data path"
        },
        knowedIssues: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Frequent issues"
        }
    });

    return Middleware;
}