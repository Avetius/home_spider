let passport = require('passport'),
    LocalStrategy = require('passport-local'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user.model'),
    secret = require('./../config/secret.js'),
    opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = secret;
opts.issuer = '';  //accounts.examplesoft.com
opts.audience = "localhost:8088"; //yoursite.net
opts.ignoreExpiration = true;

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.find({ where: { username: username }}).then((user) => {
            if (!user) {
                console.log("Invalid username");
                done(null, false, { message: 'Invalid username' });
            } else if (password != user.password) {
                console.log("Invalid password");
                done(null, false, { message: 'Invalid password'});
            } else {
                console.log("auth ok");
                done(null, user);
            }
        }).error((err)=> {
            console.log(err);
            done(err);
        });
    }
));

passport.use(new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.sub).then((user, err) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

passport.serializeUser(function(user, done) {
    console.log("serializeUser"+user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.find({where: {id: id}}).then(function(user){
        console.log("deserializeUser -> "+user);
        done(null, user);
    }).error(function(err){
        console.log(err);
        done(err, null);
    });
});

passport.isAuth = function (req,res,next){
    console.log("Checking Authentication..");
    console.log("req.user -> "+req.user);
    if(req.user){ //req.isAuthenticated()
        next();
    }
    res.send('Unauthorized'); res.sendStatus(401);
};

passport.isAdmin = function (req,res,next){
    console.log("Checking privileges");
    console.log("req.user -> "+req.user);
    if(req.user.privileges == 'admin'){ //req.isAuthenticated()
        next();
    }
    res.send('Permission Denied'); res.sendStatus(401);
};



/**
 *passport.authenticate('local');
 */

module.exports = passport;

//todo add passport strategies for facebook google and tweeter
