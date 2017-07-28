'use strict';

let User = require('../models/users/user.model.js'),
    passport = require('passport'),
    configAuth = require('../config/auth'),
    JwtStrategy = require('passport-jwt').Strategy,
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    secret = require('../setup/secret.js'),
    opts = {};

opts.jwtFromRequest = ExtractJwt.fromHeader('access');
opts.secretOrKey = secret;
/*opts.issuer = "";  //accounts.examplesoft.com
 opts.audience = "localhost:8088"; //yoursite.net*/
opts.ignoreExpiration = true;

passport.use(new JwtStrategy(opts, (payload, done) => {
    console.log('passport.use payload -> ',payload);
    User.auth(payload).then((user, err) => {
        /*console.log('passport.use user-> ',user);*/
        if (err) { return done(err, false); }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({
        // pull in our app id and secret from our authCtrl.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            User.findOne({ where: {'facebookId' : profile.id}})
                .then(user => {
                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        let newUser            = new User();
                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(err => {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                })
                .catch(err => {
                    return done(err);
                })
        });
    }));

passport.isUser = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
    console.log("Checking Authentication...");
    /*console.log("req.user -> ", req.user);*/
    if(req.user){
        next();
    }else{
        res.send('Unauthorized');
    }
};

passport.isAdmin = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
    console.log("Checking privileges...");
    /*console.log("req.user -> "+req.user);*/
    if(req.user.privileges == 'admin'){
        console.log('req.user.privileges -> ', req.user.privileges);
        next();
    }else{
        console.log('Permission Denied');
        res.send('Permission Denied')
    }
};

passport.isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(user);
        })
        .catch(err =>{
            console.log(err);
        });
});

module.exports = {
    passport: passport,
    isUser: passport.isUser,
    isAdmin: passport.isAdmin,
    isLoggedIn: passport.isLoggedIn
};

//todo add passport strategies for facebook google and tweeter
