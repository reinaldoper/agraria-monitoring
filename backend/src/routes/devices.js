const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const deviceMiddleware = require('../middlewares/updateDevice');
const validateId = require('../middlewares/validateId');

router.get('/', deviceController.getDevices);
router.post('/', deviceMiddleware, deviceController.addDevice);
router.put('/:id', validateId, deviceMiddleware, deviceController.updateDevice);
router.delete('/:id', validateId, deviceController.deleteDevice);

module.exports = router;
