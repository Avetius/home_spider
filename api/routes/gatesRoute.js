let router = require('express').router,
    gate = require('../controllers/gatesCtrl');

router
    .post('/open/:number', gate.open)
    .post('/close/:number', gate.close);

module.exports = router;