const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');

router.post('/send', commandController.sendCommand);

module.exports = router;
