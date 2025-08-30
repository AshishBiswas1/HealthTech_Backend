const labReport = require('./../Model/labReportModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

exports.addLabReport = catchAsync(async (req, res, next) => {
    const labreport = await labReport.create({
        name: req.body.name,
        user: req.body.user,
        testname: req.body.testname,
        result: req.body.result,
        unit: req.body.unit,
        normalrange: req.body.normalrange
    });

    res.status(201).json({
        status: 'success',
        data: {
            labreport
        }
    });
});

console.log("Ok");

exports.getAllLabReports = catchAsync(async (req, res, next) => {
    const labreports = await labReport.find();

    res.status(200).json({
        status: 'success',
        data: {
            labreports
        }
    });
});
