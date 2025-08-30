const appointmentController = require('./../controller/appointmentController');
const express = require('express');

const router = express.Router();

router.route('/').get(appointmentController.getAppointments);

router.route('/create').post(appointmentController.createAppointment);

module.exports = router;
