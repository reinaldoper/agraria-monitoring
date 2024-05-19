const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const deviceMiddleware = require('../middlewares/updateDevice');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/auth');

router.get('/', auth, deviceController.getDevices);
router.post('/', auth, deviceMiddleware, deviceController.addDevice);
router.put('/:id', auth, validateId, deviceMiddleware, deviceController.updateDevice);
router.delete('/:id', auth, validateId, deviceController.deleteDevice);
router.get('/:id', auth, validateId, deviceController.getDeviceById);

module.exports = router;
