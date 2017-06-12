/**
 * Created by sirius on 5/12/17.
 */

const User = require("../../models/users/user.model.js");
const errorHandler = require("../../helpers/errorHandler.js");
const response = require("../../helpers/response.js");
const upload      = require('../../setup/fileUploader.js');

/**
 * Login
 * */
exports.login = (req, res, next) => {
    return User.userlogin(req.body.login, req.body.password).then(user => {
        console.log("USERLogin in controller ->", user);
        if(user.username){
            let userInfo = {
                token: user.token,
                username: user.username
            };
            response(res, 200, userInfo, "success");
        } else {
            return errorHandler(res, 401, {}, "failed");
        }
    });
};

/**
 * Sign Up
 * */
exports.signup = (req, res, next) => {
    return User.signup({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        console.log("user.message.errors",user.message.errors);
        if(user.message.errors.message){
            console.log('Sign Up Error -> ',user.message.errors.message);
            return errorHandler(res, 401, {}, "failed");
        }
        return response(res, 201, user, "created");
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
                return response(res, 200, user, "success")
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