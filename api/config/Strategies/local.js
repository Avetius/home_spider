/**
 * Created by sirius on 9/11/17.
 */

const User          = require('../../models/users/user.model');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt-nodejs');
const mailer        = require('../../helpers/mailSender.js');
const generateToken = require('../../helpers/generateToken');
const jwt           = require('jwt-simple');
const secret        = require('../../setup/secret');

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

exports.signup = new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, res.send({
                        message: 'That email is already taken.',
                        err: true,
                        status: 401,
                        user: null
                    }));
                } else {
                    // if there is no user with that email
                    // create the user
                    let newUser = User.build({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.firstname+' '+req.body.lastname,
                        email: req.body.email,
                        privil: 'user',
                        password: req.body.password,
                        verifyToken: generateToken()
                    });
                    // save the user
                    User.create(newUser)
                    .then(user => { // returns created user record
                        let mail = {
                            from: 'barriercontroller@gmail.com',
                            to: user.email,
                            subject: 'Account verification',
                            html: '<h1>Please confirm your registration</h1><a href="https://home-spider.herokuapp.com/api/user/verify/'+user.verifyToken+'">Click here to verify your account</a>'
                        };
                        mailer.sendMail(mail,(err, info) => {
                            if(err){
                                console.log(chalk.red('Failed to send mail -> '+err));
                            } else{
                                console.log(chalk.greenBright('Email sent: '+info.response));
                            }
                        });
                        return done(null, user);
                    }).catch(err => {
                        return done({
                            message: 'Sign up failed',
                            err: true,
                            status: 401,
                            user: null
                        });
                    })
                }
            }).catch( err => { // if there are any errors, return the error
                return done({
                    message: 'Sign up failed',
                    err: true,
                    status: 401,
                    user: null
                });
            });

        });

    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

exports.login = new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                where: {
                    email: email,
                    emailVerified: true
                }
            }).then(user => {
                // if no user is found, return the message
                if (!user)
                    return done(null, false, res.send({
                        message: 'Email not found...',
                        err: true,
                        status: 401,
                        user: null
                    })); // req.flash is the way to set flashdata using connect-flash
                // if the user is found but the password is wrong
                if (!user.password === bcrypt.hashSync(password)) //
                    return done(null, false, res.send({
                        message: 'Wrong password...',
                        err: true,
                        status: 401,
                        user: null
                    })); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user jwt.encode(user.id, secret)
                return done(null, user);
            }).catch(err => {
                return done({
                    message: 'Login failed',
                    err: true,
                    status: 401,
                    user: null
                });
            });

        });
