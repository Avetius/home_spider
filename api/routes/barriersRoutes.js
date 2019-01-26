/**
 * Created by sirius on 10/12/17.
 */
let router      = require('express').Router(),
    barrierCtrl = require('../controllers/barrierCtrl.js'),
    isAdmin     = require('../setup/auth.js').isAdmin,
    isUser      = require('../setup/auth.js').isUser,
    passport    = require('../setup/auth.js').passport,
    validate    = require('../validation/validator.js');

router
    .get('/', /*passport.authenticate('jwt',{ session: false}), isUser, */barrierCtrl.getByName)
    .get('/id/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, */barrierCtrl.getById)
    .get('/all', /*passport.authenticate('jwt',{ session: false}), isAdmin, */barrierCtrl.getAll)
    .post('/',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierCreate'),*/ barrierCtrl.create)
    .put('/params/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.update)
    .delete('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierDelete'),*/ barrierCtrl.delete)
/*-----------------------------------------------RELATIONS---------------------------------------------------------------------*/
    .get('/relation/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.getByIdRel)
    .get('/relations/all', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.getAllRel)
    .put('/relation/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.setRel)
    .post('/relation/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.addRel);

module.exports = router;