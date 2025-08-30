const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const OPD = require('./../Model/OPDModel');

// Create a new OPD entry
exports.createOPD = catchAsync(async (req, res, next) => {
    const {
        bp,
        pulse,
        weight,
        name,
        dob,
        spo2,
        user,
        complaints,
        diagnosis,
        prescriptions,
        advices,
        tests_prescribed,
        follow_up
    } = req.body;

    const newOPD = await OPD.create({
        bp,
        pulse,
        weight,
        name,
        dob,
        spo2,
        user,
        complaints,
        diagnosis,
        prescriptions,
        advices,
        tests_prescribed,
        follow_up
    });

    res.status(201).json({
        status: 'success',
        data: {
            opd: newOPD
        }
    });
});

// Get all OPD entries for a user
exports.getOPDs = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const opds = await OPD.find({ user: userId });
    res.status(200).json({
        status: 'success',
        results: opds.length,
        data: {
            opds
        }
    });
});

exports.getAllOPDs = catchAsync(async (req, res, next) => {
    const opds = await OPD.find();

    res.status(200).json({
        status: 'success',
        data: {
            opds
        }
    });
});
