const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const validateUser = require('../middlewares/validateUser');

router.post('/register', validateUser, authController.register);
router.post('/login', auth, validateUser, authController.login);

module.exports = router;
