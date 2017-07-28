/**
 * Created by sirius on 5/12/17.
 */
let router      = require('express').Router(),
    userCtrl    = require('../../controllers/users/usersCtrl.js'),
    isAdmin     = require('../../setup/auth.js').isAdmin,
    isUser      = require('../../setup/auth.js').isUser,
    passport    = require('../../setup/auth.js').passport,
    validate    = require('../../validation/user.validator.js'),
    isLoggedIn  = require('../../setup/auth.js').isLoggedIn;


router
    .post('/signup',                                                                    validate('userSignUp'), userCtrl.signup)
    .post('/login',                                                                     validate('userLogin'),  userCtrl.login)
    .post('/upload',                                                                    /*upload.single('image'),*/ userCtrl.upload)
    //================================= User routes  =================================================================================
    .get('/me',     passport.authenticate('jwt',{ session: false}), isUser,                            userCtrl.userGet)
    .put('/me',     passport.authenticate('jwt',{ session: false}), isUser,    validate('userEdit'),   userCtrl.userEdit)
    //================================= Admin routes =================================================================================
    .post('/new',   passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userCreate'), userCtrl.userCreate)
    .get('/all',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGetAll)
    .get('/:id',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGet)
    .put('/:id',    passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userEdit'),   userCtrl.userEdit)
    .delete('/:id', passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userDelete)
    // route for showing the profile page
    .get('/a', userCtrl.authPage)
    .get('/profile', isLoggedIn, userCtrl.renderUser)
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook auth and login
    .get('/facebook', passport.authenticate('facebook', { scope : 'email' }))
    // handle the callback after facebook has authenticated the user
    .get('/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }))
    // route for logging out
    .get('/logout', userCtrl.logout);

module.exports = router;