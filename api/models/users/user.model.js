/**
 * Created by sirius on 5/20/17.
 */
'use strict';

const sequelize   = require('../../setup/sequelize.js');
const hash        = require('../../helpers/hashPassword').hash;
const compare     = require('../../helpers/hashPassword').compare;
const jwt         = require('jwt-simple');
const secret      = require('../../setup/secret');
const UserSchema  = require('./schemas/user.schema.js');

const User = sequelize.define('User', UserSchema,{
        timestamps: true,
        freezeTableName: true, // force not to change table name to multiple
        underscored: true,
        createdAt: true,
        updatedAt: true
    }
);

User.getUserById = function (id){
    return this.findById(id).then((user) => {
        return user;
    })
};

User.updateUser = function(id, userObj) {
    this.update({
            username: userObj.login,
            email: userObj.email
        },
        {where: {id: id}}
    ).then(() => {
        return User.findById(id).then((user) => {
            return res.send(user);
        })
    });
};
User.auth = User.getUserById;

User.userlogin = function (uname, pass) {
    return this.findOne({
        where: {
            $or: [
                {
                    username: {
                        $eq: uname
                    }
                },
                {
                    email: {
                        $eq: uname
                    }
                }
            ]
        }
    }).then((user) => {
        if (!user) {
            console.log('Invalid username or email');
            return ({
                message: 'Invalid username or email',
                err: true,
                status: 401,
                user: null
            });
        } else {
            return compare(pass, user.password).then((same) => {
                console.log('notsame -> ', same);
                if (same) {
                    console.log("auth ok, user.username -> ", user.username);
                    console.log("auth ok, user.accessToken -> ", user.accessToken);
                    return {
                        username: user.username,
                        token: user.accessToken
                    };
                    //------------------------------------
                } else {
                    console.log("Invalid password");
                    return ({
                        message: 'Invalid password',
                        err: true,
                        status: 401,
                        user: null
                    });
                }
            })
        }
    })
};

User.availbaleCredentials = function (uname, mail) {
    this.findOne({
        where: {
            $or: [
                {username: uname},
                {email: mail}
            ]
        }
    }).then((account) => {
        console.log('available credentials -> ', account);
        if (account) {
            if (account.username == uname) {
                console.log('return1');
                return ({
                    message: 'Username Already is Used',
                    err: true,
                    status: 403
                });
            } else if (account.email == mail) {
                console.log('return2');
                return ({
                    message: 'Email Already is Used',
                    err: true,
                    status: 403
                });
            } else {
                console.log('return3');
                console.log('account.email -> ', account.email);
                console.log('account.username -> ', account.username);
                return ({
                    message: 'ok',
                    err: false,
                    status: 200
                });
            }
        } else {
            console.log('return4');
            return ({
                message: 'ok',
                err: false,
                status: 200
            });
        }
    });
    //todo check at signup wether mail, username ... are available
};

User.signup = function (userObj) {
    console.log("userObj -> ", userObj);
    return this.create(userObj)
        .then((user) => {
            console.log('user created -> ', user);
            this.update(
                {accessToken: jwt.encode(user.id, secret)},
                {where: {id: user.id}}
            ).then((updated) => {
                console.log('updated -> ', updated);
                if (updated) {
                    return this.findById(user.id).then((u) => {
                        console.log('u -> ', u);
                        return u;
                    })
                } else {
                    return updated;
                }
            })
        }).catch(function(e){
            return {
                'message' : e
            }
        });
};

User.beforeCreate((user, options) => {
    return hash(user.password).then(hashedPw => {
        user.password = hashedPw;
    });
});

User.beforeUpdate((user, options) => {
    return this.availbaleCredentials(user.username, user.email)
        .then((credentials) => {
            console.log('credentials -> ', credentials);
            console.log("password updated before update");
            hash(user.password).then(hashedPw => {
                user.password = hashedPw;
            }).then(() => {
                if (credentials.err == false) {
                    this.update({
                        username: user.username,
                        email: user.email,
                        passport: user.password
                    })
                }
            })

        })
});

User.sync({force: true})
    .then(() => {
        /*return User;*/
        return User.create({
            username: 'admin',
            privileges: 'admin',
            email: 'avet.sargsyan@gmail.com',
            password: 'adminadmin'
        }).then((user) => {
            /*console.log('user created -> ',user);*/
            User.update(
                {accessToken: jwt.encode(user.id, secret)},
                {where: {id: user.id}}
            )
                .then((updated) => {
                    /*console.log('updated -> ',updated);*/
                    if (updated) {
                        return User.findById(user.id).then((u) => {
                            /*console.log('u -> ',u);*/
                            return u;
                        })
                    } else {
                        return updated;
                    }
                })
        });
    })
    .then(() => {
        return User.create({
            username: 'user',
            privileges: 'user',
            email: 'user@gmail.com',
            password: 'useruser'
        }).then((user) => {
            /*console.log('user created -> ',user);*/
            User.update(
                {accessToken: jwt.encode(user.id, secret)},
                {where: {id: user.id}}
            )
                .then((updated) => {
                    /*console.log('updated -> ',updated);*/
                    if (updated) {
                        return User.findById(user.id).then((u) => {
                            /*console.log('u -> ',u);*/
                            return u;
                        })
                    } else {
                        return updated;
                    }
                })
        });
    });

module.exports = User;

