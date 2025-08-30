const express = require('express');
const labReportController = require('./../controller/labReportController');

const router = express.Router();

router.route('/').get(labReportController.getAllLabReports);

router.route('/create').post(labReportController.addLabReport);

module.exports = router;
