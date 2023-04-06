const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.signUp);

router.post('/login', authController.logIn);

module.exports = router;
