const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const auth = require('../middlewares/auth');
const validateCommands = require('../middlewares/validateCommands');

router.post('/send', auth, validateCommands, commandController.sendCommand);

module.exports = router;
