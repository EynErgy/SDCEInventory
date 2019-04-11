module.exports = (sequelize, Sequelize) => {
    const Server = sequelize.define('server', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        serverName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            comment: "Name"
        },
        environment: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Prod, test, ..."
        },
        vlanID: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "VLAN"
        },
        ipAddress: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "IP",
            validate: {
                isIP: true
            }
        },
        platform: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Linux, Windows, ..."
        },
        monitoring: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Monitoring requirements"
        },
        services: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Running application services"
        },
        schedulledJobs: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Application related jobs"
        },
        usersRequirements: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Specific users requirements"
        },
        adminGroup: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Special admin group"
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
        startup: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Startup Order"
        },
        downtime: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: "Downtime Window"
        }
    });

    

    return Server;
}