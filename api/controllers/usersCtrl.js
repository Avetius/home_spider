/**
 * Created by sirius on 5/12/17.
 */
const bcrypt        = require('bcrypt-nodejs');
const jwt           = require('jwt-simple');
const chalk         = require('chalk');
const User          = require('../models/users/user.model.js');
const errorHandler  = require('../helpers/errorHandler.js');
const generateToken = require('../helpers/generateToken');
const mailer        = require('../helpers/mailSender.js');
const response      = require('../helpers/response.js');
const upload        = require('../setup/fileUploader.js');
const secret        = require('../setup/secret');

/**
 * Login
 * */
exports.login = (req, res, next) => {
	return User.findOne({
		where: {
			email: req.body.email
		},
		attributes:['id', 'email', 'password']
	}).then(user => {
		// if no user is found, return the message
		if (!user)
			return response(res, 401, {err:true}, 'Email not found');
		// if the user is found but the password is wrong
		if (!user.password === bcrypt.hashSync(req.body.password)) //
			return response(res, 401, {err:true}, 'Wrong password...');
		// all is well, return successful user jwt.encode(user.id, secret)
		return response(res, 200, {token:jwt.encode(user.id, secret)}, 'success');
	}).catch(err => {
	  console.log('err -> ',err);
		return response(res, 401, {err:true}, 'Login failed');
	});
};

/**
 * Sign Up
 * */
exports.signup = (req, res, next) => {
	return User.findOne({
		where: {
			email: req.body.email
		},
		attributes:['email']
	}).then(user => {
		// check to see if theres already a user with that email
		if (user) {
			return response(res, 401, {err:true}, 'That email is already taken.');
		} else {
			// if there is no user with that email
			// create the user
			let newUser = User.build({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				username: req.body.firstname+' '+req.body.lastname,
				email: req.body.email,
				privil: 'user',
				password: req.body.password,
				verifyToken: generateToken()
			});
			// save the user
			User.create(newUser)
				.then(user => { // returns created user record
					let mail = {
						from: 'barriercontroller@gmail.com',
						to: user.email,
						subject: 'Account verification',
						html: '<h1>Please confirm your registration</h1><a href="https://home-spider.herokuapp.com/api/user/verify/'+user.verifyToken+'">Click here to verify your account</a>'
					};
					mailer.sendMail(mail,(err, info) => {
						if(err){
							console.log(chalk.red('Failed to send mail -> '+err));
						} else{
							console.log(chalk.greenBright('Email sent: '+info.response));
						}
					});
					return response(res, 201, {user}, 'success');
				})
				.catch(err => {
				return response(res, 401, {err:true}, 'Sign up failed');
			})
		}
	}).catch( err => { // if there are any errors, return the error
		return response(res, 401, {err:true}, 'Sign up failed');
	});
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
	return User.update({
      emailVerified: true,
	},{
	    where:{
	      verifyToken: verifyToken
		  }
	}).then(() => {
		return res.send("OK")
	})
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