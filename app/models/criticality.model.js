module.exports = (sequelize, Sequelize) => {
    const Criticality = sequelize.define('criticality', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        level:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            comment: "Level short name"
        },
        description:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Long description"
        }
    });

    return Criticality;
}