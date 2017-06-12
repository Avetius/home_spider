let router = require('express').Router(),
    gate = require('../../controllers/gates/gatesCtrl.js');

router
    .post('/open/:number', gate.action)
    .post('/close/:number', gate.action);

module.exports = router;