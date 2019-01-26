/**
 * Created by sirius on 5/12/17.
 */
const router      = require('express').Router();
const gateCtrl    = require('../controllers/gatesCtrl.js');
const isAdmin     = require('../setup/auth.js').isAdmin;
const isUser      = require('../setup/auth.js').isUser;
const passport    = require('../setup/auth.js').passport;
const validate    = require('../validation/validator.js');

router
    .get('/',passport.authenticate('jwt',{ session: false}), isUser, gateCtrl.getByUser)
    .get('/:id',passport.authenticate('jwt',{ session: false}), isAdmin, gateCtrl.getById)
    .get('/all',passport.authenticate('jwt',{ session: false}), isAdmin, gateCtrl.getAll)
    .post('/',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCreate'),*/ gateCtrl.create)
    .put('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateEdit'),*/ gateCtrl.edit)
    .delete('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateDelete'),*/ gateCtrl.delete);

module.exports = router;