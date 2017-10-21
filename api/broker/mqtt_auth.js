/**
 * Created by sirius on 10/11/17.
 * todo optimize the query in authorizePublish and authorizeSubscribe with attributes or somehow
 */
const User              = require('../models/users/user.model');
const Barrier           = require('../models/barriers/barrier.model');
const relUserBarrier    = require('../models/relations/relation.models');
const bcrypt            = require('bcrypt-nodejs');

// Accepts the connection if the username and password are valid
exports.authenticate = function(client, username, password, callback) {
    if(!(username && password)) return null;
    if(username.includes('barrier_')){
        Barrier.findOne({ // (username === 'avet' && password.toString() === '333')
            where: {
                name: username
            }
        }).then(barrier => {
            if (!barrier) return null;
            if (!barrier.password === bcrypt.hashSync(password.toString())) {
                return null;
            }
            // create the loginMessage and save it to session as flashdata
            // all is well, return successful user jwt.encode(user.id, secret)
            client.user = username;
            return callback(null, true);
        }).catch(err => {
            console.error("Error in BARRIER mqtt authentication: ",err);
            return null;
        });
    }else{
        User.findOne({ // (username === 'avet' && password.toString() === '333')
            where: {
                email: username,
                emailVerified: true
            }
        }).then(user => {
            if (!user) return null;
            if (!user.password === bcrypt.hashSync(password.toString())) {
                return null;
            }
            client.user = username;
            return callback(null, true);
        }).catch(err => {
            console.error("Error in USER mqtt authentication: ",err);
            return null;
        });
    }
};

// In this case the client authorized as alice can publish to /usersRules/alice taking
// the username from the topic and verifing it is the same of the authorized user
exports.authorizePublish = function(client, topic, payload, callback) {
    let authorized = false;
    if(client.user.includes('barrier_')){
        Barrier.find({
            where: {name: client.user},
            attributes:['subTopic'],
            include: [{
                model: User,
                attributes:['subTopic']
            }]
        }).then(function (barrier) {
            console.log('authorized -> ', !!barrier.Users.filter(elem =>{ return elem.subTopic === topic}).length);
            callback(null, !!barrier.Users.filter(elem =>{ return elem.subTopic === topic}).length);
        }).catch(err => {
            console.log('error in Barrier authorizePublish -> ',err);
            callback(null, false);
        });
         // (client.user === topic.split('/')[1]) || (client.user === 'barrier_naftihayat1/pub') condition must return true
    }else{
        User.find({
            where: {email: client.user, emailVerified: true},
            attributes:['subTopic'],
            include: [{
                model: Barrier,
                attributes:['subTopic']
            }]
        }).then(function (user) {
            console.log('authorized -> ', !!user.Barriers.filter(elem =>{ return elem.subTopic === topic}).length);
            callback(null, !!user.Barriers.filter(elem =>{ return elem.subTopic === topic}).length);
        }).catch(err =>{
            console.log('error in User authorizePublish -> ',err);
            callback(null, false);
        });
    }
};

// In this case the client authorized as alice can subscribe to /usersRules/alice taking
// the username from the topic and verifing it is the same of the authorized user
exports.authorizeSubscribe = function(client, topic, callback) {
    callback(null, client.user + '/sub' === topic); // client.user === topic.split('/')[1] || (client.user === 'avet.sargsyan@gmail.com/sub')
};

