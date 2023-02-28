const express = require("express");
const router = express.Router();
const {authToken} = require('../middleware/auth');
const dataController = require('../controllers/patientDataController');


// router.route('/login').post(authController.login);

router.route('/getpatientreportbyemail').get(authToken,dataController.getPatientReportEmail);
router.route('/getpatientreportid').get(authToken, dataController.getPatientReportID);
router.route('/updatepatientreport').post(authToken, dataController.updatePatientReport);

module.exports = router;