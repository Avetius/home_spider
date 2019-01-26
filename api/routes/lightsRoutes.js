/**
 * Created by sirius on 7/12/17.
 */
const router      = require('express').Router();
const lightCtrl    = require('../controllers/lightCtrl.js');
const isAdmin     = require('../setup/auth.js').isAdmin;
const isUser      = require('../setup/auth.js').isUser;
const passport    = require('../setup/auth.js').passport;
const validate    = require('../validation/validator.js');

router
    .post('/entrance/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ lightCtrl.action);

module.exports = router;