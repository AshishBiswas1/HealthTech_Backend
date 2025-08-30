const doctorController = require('./../controller/doctorController');
const authController = require('./../controller/authController');
const express = require('express');

const router = express.Router();

router.route('/').get(doctorController.getAllDoctors);

router.route('/create').post(doctorController.addDoctor);

module.exports = router;
