const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const Appointment = require('./../Model/appointmentModel');

// Create a new appointment
exports.createAppointment = catchAsync(async (req, res, next) => {
    const { phoneNo, address, date, name, dob, doctorSpeciality } = req.body;

    const newAppointment = await Appointment.create({
        phoneNo,
        address,
        date,
        name,
        dob,
        doctorSpeciality
    });

    res.status(201).json({
        status: 'success',
        data: {
            appointment: newAppointment
        }
    });
});

// Get all appointments for a user
exports.getAppointments = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const appointments = await Appointment.find({ user: userId });

    res.status(200).json({
        status: 'success',
        results: appointments.length,
        data: {
            appointments
        }
    });
});
