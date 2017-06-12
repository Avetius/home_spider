/**
 * Created by sirius on 6/12/17.
 */
const Sequelize   = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [4,30],
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    email : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,50],
            isEmail: true,
            notEmpty: true
        }
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {len: [5,20]}
    },
    accessToken : {
        type : Sequelize.STRING
    },
    privileges : {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user'
    }
};