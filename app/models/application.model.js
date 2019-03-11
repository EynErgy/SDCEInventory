module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define('application', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        }
    });

    return Application;
}