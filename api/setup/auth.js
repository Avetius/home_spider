//todo add passport strategies for facebook google and tweeter

'use strict';

const User = require('../models/users/user.model.js');
const passport = require('passport');
const Facebook = require('../config/Strategies/facebook');
const Google = require('../config/Strategies/google');
const jwt = require('../config/Strategies/jwt');
const localSignup = require('../config/Strategies/local').signup;
const localLogin = require('../config/Strategies/local').login;

passport.use('jwt', jwt);
passport.use('facebook',Facebook);
passport.use('google',Google);

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
    console.log("req.user.privil -> "+req.user.privil);
    if((req.user.privil === 'admin') || (req.user.privil === 'owner')){
        console.log('req.user.privileges -> ', req.user.privileges);
        next();
    }else{
        console.log('Permission Denied');
        res.send('Permission Denied')
    }
};

passport.isOwner = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
	console.log("Checking privileges...");
    /*console.log("req.user -> "+req.user);*/
	if(req.user.privileges === 'owner'){
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
	  isOwner: passport.isOwner,
    isLoggedIn: passport.isLoggedIn
};
