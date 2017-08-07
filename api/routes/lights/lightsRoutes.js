/**
 * Created by sirius on 7/12/17.
 */
let router      = require('express').Router(),
    lightCtrl    = require('../../controllers/lights/lightCtrl.js'),
    isAdmin     = require('../../setup/auth.js').isAdmin,
    isUser      = require('../../setup/auth.js').isUser,
    passport    = require('../../setup/auth.js').passport,
    validate    = require('../../validation/user.validator.js');

router
    .post('/entrance/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ lightCtrl.action);

module.exports = router;