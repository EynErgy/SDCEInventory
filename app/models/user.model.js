module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: "User full name"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
            comment: "User eMail"
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^\+[0-9]+$/i
            },
            comment: "User phone number in internationalformat"
        }
    });

    return User;
}