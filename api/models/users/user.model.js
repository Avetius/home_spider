/**
 * Created by sirius on 5/20/17.
 */
'use strict';

const jwt           = require('jwt-simple');
const bcrypt        = require('bcrypt-nodejs');
const Sequelize     = require('../../setup/sequelize.js');
const secret        = require('../../setup/secret');
const UserSchema    = require('./user.schema.js');
const User          = Sequelize.define( 'User', UserSchema);

User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password);//, bcrypt.genSaltSync(8), null);
    return user;
});
/*

User.sync({force: false})
    .then(() => {
        /!*return User;*!/
        return User.bulkCreate([
        {
            firstname: "Avet",
            lastname: "Sargsyan",
            emailVerified: true,
            username: 'Owner',
            privil: 'owner',
            email: 'avet.sargsyan@gmail.com',
            subTopic: 'avet.sargsyan@gmail.com/sub',
            password: bcrypt.hashSync('pic16f84a')
        },{
            firstname: "Artur",
            lastname: "Shaxkyan",
            emailVerified: true,
            username: 'Artur',
            privil: 'user',
            email: 'arturshaxkyan1@gmail.com',
            subTopic: 'verified_admin@gmail.com/sub',
            password: bcrypt.hashSync('asd123')
        }])
          .then(console.log('Users are synchronized'));
    });
*/


/*
 User.create({
 firstname: "Avet",
 lastname: "Sargsyan",
 emailVerified: true,
 username: 'Owner',
 privil: 'owner',
 email: 'avet.sargsyan@gmail.com',
 subTopic: 'avet.sargsyan@gmail.com/sub',
 password: 'pic16f84a'
 })
 */

/*

User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

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

User.login = function (uname, pass) {
    return this.findOne({
        where: {
            email: uname
        }
    }).then((user) => {
        if (!user) {
            console.log('Invalid username or email');
            return ({
                message: 'Invalid email or password',
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
*/

/*
    .then(() => {
        return User.create({
            username: 'user',
            privileges: 'user',
            email: 'user@gmail.com',
            password: 'useruser'
        }).then((user) => {
            /!*console.log('user created -> ',user);*!/
            User.update(
                {accessToken: jwt.encode(user.id, secret)},
                {where: {id: user.id}}
            )
            .then((updated) => {
                /!*console.log('updated -> ',updated);*!/
                if (updated) {
                    return User.findById(user.id).then((u) => {
                        /!*console.log('u -> ',u);*!/
                        return u;
                    })
                } else {
                    return updated;
                }
            })
        });
    });*/


module.exports = User;

