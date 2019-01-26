/**
 * Created by sirius on 7/20/17.
 */
const User = require('../../models/users/user.model.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../../setup/secret.js');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromHeader('access');
opts.secretOrKey = secret;
/*opts.issuer = "";  //accounts.examplesoft.com
 opts.audience = "localhost:8088"; //home-spider.herokuapp.com*/
opts.ignoreExpiration = true;

module.exports = new JwtStrategy(opts, (payload, done) => {
        console.log('passport.use payload -> ', payload);
        User.findById(payload).then(user => {
            console.log('passport jwt user-> ',user);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(err => {
            return done(err, false);
        });
    })
