'use strict';

let User = require('../models/users/user.model.js'),
    passport = require('passport'),
    configAuth = require('./auth'),
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
;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
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
