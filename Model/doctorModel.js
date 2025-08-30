const mongoose = require('mongoose');
// name, Registration number -> password and hospital, speciality, hospital name
const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [30, 'Name should be less than 30 characters'],
        minlength: [6, 'Name must be atleast 6 characters']
    },

    registration: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },

    speciality: {
        type: String,
        required: true,
        enum: [
            'Cardiologist',
            'Dentist',
            'Dermatologist',
            'Neurologist',
            'Orthopedic',
            'General Physician',
            'Gynecologist',
            'Pediatrician',
            'Psychiatrist',
            'Radiologist',
            'Urologist'
        ]
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
