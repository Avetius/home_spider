/**
 * Created by sirius on 6/12/17.
 * todo add field verification attributes e.g. unique, allowNull, validate
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
        /*unique: true,*/
        /*allowNull: true,*/
        /*validate: {
            /!*len: [5,30],*!/
            /!*notEmpty: true,*!/
            /!*isAlphanumeric: true*!/ // <--- This is the shit
        }*/
    },
    email : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
        /*validate: {
            /!*len: [5,50],*!/
            /!*isEmail: true,*!/
            /!*notEmpty: true*!/
        }*/
    },
    password : {
        type: Sequelize.STRING,
        /*allowNull: true,*/
        /*validate: {
            /!*len: [5,40],*!/
            /!*isAlphanumeric: true*!/
        }*/
    },
    firstname: {
        type: Sequelize.STRING,
        /*unique: false,*/
        /*allowNull: true,*/
        /*validate: {
            /!*len: [1,40]*!/
            /!*notEmpty: true,*!/
            /!*is: ["^[a-z]+$",'i']*!/
        }*/
    },
    lastname: {
        type: Sequelize.STRING,
        /*unique: false,*/
        /*allowNull: true,*/
        /*validate: {
            /!*len: [1,40]*!/
            /!*notEmpty: true,*!/
            /!*is: ["^[a-z]+$",'i'],*!/
        }*/
    },
    subTopic: {
        type: Sequelize.STRING
    },
    facebookID          : {type: Sequelize.STRING},
    facebookToken       : {type: Sequelize.STRING},
    facebookEmail       : {type: Sequelize.STRING},
    facebookName        : {type: Sequelize.STRING},

    twitterID           : {type: Sequelize.STRING},
    twitterToken        : {type: Sequelize.STRING},
    twitterDisplayName  : {type: Sequelize.STRING},
    twitterUsername     : {type: Sequelize.STRING},

    googleID            : {type: Sequelize.STRING},
    googleToken         : {type: Sequelize.STRING},
    googleEmail         : {type: Sequelize.STRING},
    googleName          : {type: Sequelize.STRING},

    verifyToken         : {type: Sequelize.STRING},
    emailVerified       : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    /* For reset password */
    resetPasswordToken  : { type: Sequelize.STRING},
    resetPasswordExpires: { type: Sequelize.DATE},
    accessToken         : { type : Sequelize.STRING},
    privil : {
        /*allowNull: true,*/ //issue with false
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'owner'],
        /*defaultValue: 'user'*/
    }
};