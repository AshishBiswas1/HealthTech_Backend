const express = require('express');
const errorController = require('./controller/errorController');
const userRouter = require('./Router/userRouter');
const appointmentRouter = require('./Router/appointmentRouter');
const doctorRouter = require('./Router/doctorRouter');
const labReportRouter = require('./Router/labReportRouter');
const OPDRouter = require('./Router/OPDRouter');
const AppError = require('./util/appError');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: [
            'https://37qwx6k2-3000.inc1.devtunnels.ms/',
            'https://759dc4q2-8000.inc1.devtunnels.ms/'
        ],
        methods: ['GET', 'POST', 'DELETE', 'PATCH','OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true
    })
);

app.options('*', cors());

app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Health Tech'
    });
});

app.use('/api/health/user', userRouter);
app.use('/api/health/appointment', appointmentRouter);
app.use('/api/health/doctor', doctorRouter);
app.use('/api/health/labReport', labReportRouter);
app.use('/api/health/OPD', OPDRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController); // Use error controller as the last middleware

module.exports = app;
