/**
 * Created by sirius on 5/14/17.
 */
let router = require('express').Router(),
    user = require('../controllers/usersCtrl.js');

router
    .post('/open/:number', user.login)
    .post('/close/:number', user.signup);

module.exports = router;
