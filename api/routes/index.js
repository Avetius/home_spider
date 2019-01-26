/**
 * Created by sirius on 9/21/17.
 */
const router          = require('express').Router();
const userRoutes      = require('./usersRoutes.js');
const gateRoutes      = require('./gatesRoutes.js');
const lightRoutes     = require('./lightsRoutes.js');
const meterRoutes     = require('./metersRoutes.js');
const barrierRoutes   = require('./barriersRoutes.js');

router.use('/user', userRoutes);
router.use('/gate', gateRoutes);
router.use('/light', lightRoutes);
router.use('/meter', meterRoutes);
router.use('/barrier', barrierRoutes);

module.exports = router;