/**
 * Created by sirius on 5/12/17.
 */
let router      = require('express').Router(),
    gateCtrl    = require('../../controllers/gates/gatesCtrl.js'),
    isAdmin     = require('../../setup/auth.js').isAdmin,
    isUser      = require('../../setup/auth.js').isUser,
    isLoggedIn  = require('../../setup/auth.js').isLoggedIn,
    passport    = require('../../setup/auth.js').passport,
    validate    = require('../../validation/user.validator.js');

router
    .post('/open/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ gateCtrl.action)
    .post('/close/:number', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('userEdit'),*/ gateCtrl.action)
    // route for showing the profile page
    .post('/profile', isLoggedIn, gateCtrl.renderUser)

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
    .post('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))

// handle the callback after facebook has authenticated the user
    .post('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }))

// route for logging out
    .post('/logout', gateCtrl.logout);

module.exports = router;