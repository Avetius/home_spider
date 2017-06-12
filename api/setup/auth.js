'use strict';

const User = require('../models/users/user.model.js');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../setup/secret.js');
let opts = {};

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

passport.isUser = function (req,res,next){
    /*passport.authenticate('jwt', { session: false});*/
    console.log("Checking Authentication...");
    /*console.log("req.user -> ", req.user);*/
    if(req.user){
        next();
    }else{
        res.send('Unauthorized');
    }
};

passport.isAdmin = function (req,res,next){
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

module.exports = {
    passport: passport,
    isUser: passport.isUser,
    isAdmin: passport.isAdmin,
};

//todo add passport strategies for facebook google and tweeter
