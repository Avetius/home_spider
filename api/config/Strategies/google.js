/**
 * Created by sirius on 7/20/17.
 */
'use strict';

/**
 * Module dependencies.
 */
const User              = require('../../models/users/user.model');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth        = require('../auth');

module.exports = new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({
                where: {
                    'googleId': profile.id
                }
            }).then(user => {
                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    let newUser          = User.build({
                        googleId    : profile.id,
                        googleToken : token,
                        googleName  : profile.displayName,
                        googleEmail : profile.emails[0].value // pull the first email
                    });
                    // save the user
                    User.create(newUser)
                        .then(user => {
                            return done(null, newUser);
                        })
                        .catch(err => {
                            throw err;
                        });
                }
            }).catch(err => {
                return done({
                    message: 'Sign up failed',
                    err: true,
                    status: 401,
                    user: null
                });
            });
        });
    });