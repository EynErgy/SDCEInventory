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
        }
    });

    

    return Server;
}