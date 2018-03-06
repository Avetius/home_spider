/**
 * Created by sirius on 5/12/17.
 */
const router      = require('express').Router();
const userCtrl    = require('../controllers/usersCtrl.js');
const isAdmin     = require('../setup/auth.js').isAdmin;
const isUser      = require('../setup/auth.js').isUser;
const passport    = require('../setup/auth.js').passport;
const validate    = require('../validation/validator.js');
const isLoggedIn  = require('../setup/auth.js').isLoggedIn;

router
    .post('/signup', validate('userSignUp'), userCtrl.signup)
    .post('/login', validate('userLogin'), userCtrl.login)
    .post('/verify/:verifyToken', userCtrl.verify)
    .post('/upload', /*upload.single('image'),*/ userCtrl.upload)
    //================================= User routes  =================================================================================
    .get('/me', passport.authenticate('jwt',{ session: false}), isUser, userCtrl.userGet)
    .put('/me',     passport.authenticate('jwt',{ session: false}), isUser,    validate('userEdit'),   userCtrl.userEdit)
    //================================= Admin routes =================================================================================
    .post('/new',   passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userCreate'), userCtrl.userCreate)
    .post('/all',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGetAll)
    .get('/id/:id',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGet)
    .put('/id/:id',    passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userEdit'),   userCtrl.userEdit)
    .delete('/id/:id', passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userDelete)
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