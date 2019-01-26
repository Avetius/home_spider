/**
 * Created by sirius on 7/20/17.
 */

'use strict';

/**
 * Module dependencies.
 */
const User              = require('../../models/users/user.model');
const passport          = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const configAuth        = require('../auth');

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
module.exports = new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // find the user in the database based on their facebook id
                User.findOne({
                    where: {
                        'facebookId' : profile.id
                    }
                }).then(user => {
                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        let newUser  = User.build({
                            facebookID    : profile.id, // set the users facebook id
                            facebookToken : profile.token, // we will save the token that facebook provides to the user
                            facebookName  : profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
                            facebookEmail : profile.emails[0].value // facebook can return multiple emails so we'll take the first
                        });
                        // set all of the facebook information in our user model

                        // save our user to the database
                        User.create(newUser)
                            .then(user => {
                                return done(null, user);
                            })
                            .catch(err => {
                                throw err;
                            });
                            // if successful, return the new user
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
