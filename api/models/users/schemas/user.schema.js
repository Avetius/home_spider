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
            len: [5,30],
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
        validate: {
            len: [10,40],
            isAlphanumeric: true
        }
    },
    firstname: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            len: [1,40],
            notEmpty: true,
            is: ["^[a-z]+$",'i']
        }
    },
    lastname: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            len: [1,40],
            notEmpty: true,
            is: ["^[a-z]+$",'i'],
        }
    },
    facebookId: {
        type: Sequelize.STRING
    },
    ownPropertyIds:{
        type: Sequelize.STRING,
    },
    sharedPropertyIds:{
        type: Sequelize.STRING,
    },
    verifyToken: {
        type: String
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    /* For reset password */
    resetPasswordToken: {
        type: Sequelize.STRING
    },
    resetPasswordExpires: {
        type: Sequelize.DATE
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