let passport = require('passport');
let LocalStrategy = require('passport-local');
let User = require('../app/models/user.model');
let app = require('./express.js');
let SHA256 = require('crypto-js/sha256');

app.use(passport.initialize());


passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.auth(username,password).then(function(data){
            if (data.err){
                done(null, false, data.msg);
            }else{
                done(null, data.user);
            }
        });
    }
));

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
