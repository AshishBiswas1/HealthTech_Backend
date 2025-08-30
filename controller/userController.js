const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const User = require('./../Model/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found by that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.addUser = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        return next(new AppError('No user found by that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError('No user found by that id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
