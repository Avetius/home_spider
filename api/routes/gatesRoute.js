let router = require('express').Router(),
    gate = require('../controllers/gatesCtrl.js');

router
    .post('/open/:number', gate.action)
    .post('/close/:number', gate.action);

module.exports = router;