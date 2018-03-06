/**
 * Created by sirius on 8/29/17.
 */
const router      = require('express').Router();
const meterCtrl   = require('../controllers/meterCtrl.js');
const isAdmin     = require('../setup/auth.js').isAdmin;
const isUser      = require('../setup/auth.js').isUser;
const passport    = require('../setup/auth.js').passport;
const validate    = require('../validation/validator.js');

router
    .get('/electricity',   meterCtrl.action)
    .post('/electricity',  meterCtrl.action);

module.exports = router;