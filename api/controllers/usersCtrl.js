/**
 * Created by sirius on 5/12/17.
 */
const bcrypt        = require('bcrypt-nodejs');
const jwt           = require('jwt-simple');
const chalk         = require('chalk');
const secret        = require('../setup/secret.js');
const User          = require('../models/users/user.model.js');
const errorHandler  = require('../helpers/errorHandler.js');
const mailer        = require('../helpers/mailSender.js');
const response      = require('../helpers/response.js');
const upload        = require('../setup/fileUploader.js');

/**
 * Login
 * */
exports.login = (req, res, next) => {
    return User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user => {
        if(user){
            let userinfo = {
                firstname : user.firstname,
                lastname  : user.lastname,
                email  : user.email,
                token : jwt.encode(user.id, secret)
            };
            response(res, 200, userinfo, 'success');
        }else{
            console.log(chalk.red('no user found at login'));
            errorHandler(res, 401, {}, 'no user found');
        }

    }).catch(err => {
        console.log(chalk.red('login err -> '+err));
        errorHandler(res, 401, err, 'failed');
    });
};

/**
 * Sign Up
 * */
exports.signup = (req, res, next) => {
    return User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        privil: 'user',
        username: req.body.firstName+' '+req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
        .then((user) => { // returns created user record
            let mail = {
                from: 'barriercontroller@gmail.com',
                to: req.body.email,
                subject: 'Account verification',
                html: '<h1>Please confirm your registration</h1><a href="https://home-spider.herokuapp.com/api/user/verify/000000000">Click here to verify your account</a>'
            };
            mailer.sendMail(mail,(err, info) => {
                if(err){
                    console.log(chalk.red('Failed to send mail -> '+err));
                } else{
                    console.log(chalk.greenBright('Email sent: '+info.response));
                }
            });
            return response(res, 201, user, "created");
        })
        .catch(err => {
            console.log(chalk.red('error in sigup -> ' + err.errors[0].path + ' is already taken'));
            return response(res, 400, {}, err.errors[0].path + ' is already taken');
        })
};

/**
 * Get User
 * */
exports.userGet =(req, res, next) => {
    let id;
    if(req.params.id){
        id = req.params.id
    }else{
        id = req.user.id;
    }
    if(id) {
        return User.getUserById(id).then((user) => {
            return response(res, 200, user, "success");
        })
    }else{
        return errorHandler(res, 400, {}, "cant get id");
    }
};

/**
 * Create User
 * */
exports.userCreate = (req, res, next) => {
    let role = req.body.role? req.body.role : 'user';
    return User.signup({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        privileges: role
    }).then((user) => {
        if(user.username){
            response(res, 200, {token : user.token, username : user.username}, "success");
        }else{
            errorHandler(res, 400, {}, "failed");
        }
    })
};

/**
 * Edit User by Id
 * */
exports.userEdit = (req, res, next) => {
    let id;
    if(req.params.id){
        id = req.params.id
    }else{
        id = req.user.id;
    }
    let UserObj = {};
    let keys = [];
    for (key in req.body){
        keys.push(key);
        UserObj[key] = req.body[key];
    }

    return User.update(
        {
            username: req.body.login,
            email: req.body.email
        },
        {where:{id:id}}
    ).then(() => {
        return User.findById(id).then((user) => {
            if(user.username){
                return response(res, 200, {asd:"asd"}, "success")
            }
        })
    })
};

/**
 * Delete User by Id
 * */
exports.userDelete = (req, res, next) => {
    let id = req.params.id;
    return User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        return response(res, 200, {}, "success");
    })
};

/*
 * Get all users
 * */
exports.userGetAll = (req, res, next) => {
    return User.findAll().then((users) => {
        return response(res, 200, users, "success");
    })
};

/**
 * Upload
 * */
exports.upload = (req, res, next) => {
    console.log('upload controller');
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            return response(res, 400, {}, "failed");
        }else if(req.file){
            console.log("req.file -> ", req.file);
            return response(res, 200, {file:req.file}, "success");
        }else{
            return response(res, 400, {}, "Oops, smthng went wrong");
        }
        // Everything went fine
    });

};
exports.verify = (req, res, next) => {
    let verifyToken = req.params.verifyToken;
};

exports.renderUser = (req, res, next) => {
    res.send({
        user : req.user // get the user out of session and pass to template
    });
};

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

exports.authPage = (req, res, next) => {
    console.log('qaq');
    res.render('index.ejs'); // load the index.ejs file
};

exports.renderIndex = (req, res, next) => {
    res.render('index.ejs');
};

exports.renderLogin = (req, res, next) => {
    res.render('login.ejs');
};

exports.renderSignup = (req, res, next) => {
    res.render('signup.ejs');
};

exports.renderProfile = (req, res, next) => {
    res.render('profile.ejs');
};