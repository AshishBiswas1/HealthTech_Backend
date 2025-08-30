const OPDController = require('./../controller/OPDController');
const express = require('express');

const router = express.Router();

router.route('/').get(OPDController.getAllOPDs);

router.route('/create').post(OPDController.createOPD);

module.exports = router;
