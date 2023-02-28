const express = require("express");
const router = express.Router();
const {authToken} = require('../middleware/auth');
const regController = require('../controllers/regcontrollers');


router.route('/registeremployee').post(authToken,regController.registerEmployee);
router.route('/registerpatient').post(authToken,regController.registerPatient);
module.exports = router;