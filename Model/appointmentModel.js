const mongoose = require('mongoose');
// name, dob, address, phone no., doctor speciality, date

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [30, 'Name should be less than 30 characters'],
        minlength: [6, 'Name must be atleast 6 characters']
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true,
        maxlength: 10
    },
    doctorSpeciality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

appointmentSchema.pre('save', function (next) {
    this.populate({
        path: 'doctorSpeciality',
        select: 'speciality'
    });

    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
