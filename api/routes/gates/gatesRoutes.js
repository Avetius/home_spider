/**
 * Created by sirius on 5/12/17.
 */
let router      = require('express').Router(),
    gateCtrl    = require('../../controllers/gates/gatesCtrl.js'),
    isAdmin     = require('../../setup/auth.js').isAdmin,
    isUser      = require('../../setup/auth.js').isUser,
    passport    = require('../../setup/auth.js').passport,
    validate    = require('../../validation/user.validator.js');

router
    .post('/open/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ gateCtrl.action)
    .post('/close/:number', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('userEdit'),*/ gateCtrl.action);

module.exports = router;