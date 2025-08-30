const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('./../Model/userModel');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expiresIn: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    const {
        name,
        email,
        password,
        confirmPassword,
        mobileNumber,
        address,
        dob
    } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        mobileNumber,
        address,
        dob
    });

    createSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // 2. Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3. If everything ok, send token to client
    createSendToken(user, 200, res);
});
