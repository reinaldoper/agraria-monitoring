const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const auth = require('../middleware/auth');

router.post('/send', auth, commandController.sendCommand);

module.exports = router;
