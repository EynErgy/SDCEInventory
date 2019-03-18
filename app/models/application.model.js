module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define('application', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        appName:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            comment: "Application Name"
        },
        appPurpose:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Purpose"
        },
        usersLocation: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Users Location"
        },
        businessImpact:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Business Impact"
        },
        technicalDetails:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Technical details"
        }
    });

    return Application;
}