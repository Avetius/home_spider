/**
 * Created by sirius on 8/29/17.
 */
let router      = require('express').Router(),
    meterCtrl    = require('../../controllers/meters/meterCtrl.js'),
    isAdmin     = require('../../setup/auth.js').isAdmin,
    isUser      = require('../../setup/auth.js').isUser,
    passport    = require('../../setup/auth.js').passport,
    validate    = require('../../validation/user.validator.js');

router
    .get('/electricity',   meterCtrl.action)
    .post('/electricity',  meterCtrl.action);

module.exports = router;