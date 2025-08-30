const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const Doctor = require('./../Model/doctorModel');

exports.getAllDoctors = catchAsync(async (req, res, next) => {
    const doctors = await Doctor.find();

    res.status(200).json({
        status: 'success',
        data: {
            doctors
        }
    });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        return next(new AppError('No doctor found by that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    });
});

exports.addDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.create({
        name: req.body.name,
        registration: req.body.registration,
        password: req.body.password,
        hospital: req.body.hospital,
        speciality: req.body.speciality
    });

    res.status(201).json({
        status: 'success',
        data: {
            doctor
        }
    });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doctor) {
        return next(new AppError('No doctor found by that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    });
});

exports.deleteDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
        return next(new AppError('No doctor found by that id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
