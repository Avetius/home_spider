/**
 * Created by sirius on 5/12/17.
 */
const bcrypt        = require('bcrypt-nodejs');
const jwt           = require('jwt-simple');
const chalk         = require('chalk');
const User          = require('../models/users/user.model.js');
const errorHandler  = require('../helpers/errorHandler.js');
const response      = require('../helpers/response.js');
const upload        = require('../setup/fileUploader.js');
const secret        = require('../setup/secret');

/**
 * Login
 * */
exports.login = (req, res, next) => {
  let email = req.body.email,
		password = req.body.password;
	User.findOne({
		where: {
			email: email,
			emailVerified: true
		},
		attributes:['id', 'email', 'password']
	}).then(user => {
		// if no user is found, return the message
		if (!user)
			return res.send({
				message: 'Email not found...',
				err: true,
				status: 401,
				user: null
			}); // req.flash is the way to set flashdata using connect-flash // return done(null, false,
		// if the user is found but the password is wrong
		if (!user.password === bcrypt.hashSync(password)) //
			return res.send({
				message: 'Wrong password...',
				err: true,
				status: 401,
				user: null
			}); // create the loginMessage and save it to session as flashdata // return done(null, false,
		// all is well, return successful user jwt.encode(user.id, secret)
		return res.send(jwt.encode(user.id, secret)); // done(null,
	}).catch(err => {
		return res.send({
			message: 'Login failed',
			err: true,
			status: 401,
			user: null
		});
	});
};

/**
 * Sign Up
 * */
exports.signup = (req, res, next) => {
    return response(res, 200, {"Registered":"successfully"}, 'Registred Successfully');
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