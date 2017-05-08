let router = require('express').router,
    gate = require('../controllers/gatesCtrl');

router
    .post('/open/:number', gate.action)
    .post('/close/:number', gate.action);

module.exports = router;