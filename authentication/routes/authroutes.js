const { Router } = require('express');
const b_crypt = require('bcryptjs');
const jwt_instance = require('jsonwebtoken');
//import models
const router = Router();
const authController = require('../controllers/authcontrollers');

router.get('/signup', authController.signup_post);

router.post('/login', authController.login_post);

module.exports = router;