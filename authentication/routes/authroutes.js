const express = require("express");
const router = express.Router();
const {authToken} = require('../middleware/auth');
const authController = require('../controllers/authcontrollers');


router.route('/login').post(authController.login);

router.route('/addemployee').post(authToken,authController.addEmployee);

module.exports = router;