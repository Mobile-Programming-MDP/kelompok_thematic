// Router untuk Authentication
const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

// Routes untuk Auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', AuthController.getProfile);
router.post('/logout', AuthController.logout);

module.exports = router;
