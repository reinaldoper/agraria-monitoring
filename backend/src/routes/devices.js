const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const deviceMiddleware = require('../middlewares/validateDevice');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/auth');
const validateIdentifier = require('../middlewares/validateIdentifier');


router.get('/', auth, deviceController.getDevices);
router.post('/', deviceMiddleware, deviceController.addDevice);
router.put('/:id', auth, validateId, deviceMiddleware, deviceController.updateDevice);
router.delete('/:id', auth, validateId, deviceController.deleteDevice);
router.get('/:id', validateId, deviceController.getDeviceById);
router.get('/identifier/:identifier', auth, validateIdentifier, deviceController.getDeviceByIdentify)

module.exports = router;
