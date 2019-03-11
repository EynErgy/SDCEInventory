module.exports = (sequelize, Sequelize) => {
    const AppServer = sequelize.define('server', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Description"
        },
        functionality: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Functionality"
        },
        startOrder:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "1, 2 , ..."
        }
    });

    return AppServer;
}