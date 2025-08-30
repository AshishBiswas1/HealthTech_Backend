const mongoose = require('mongoose');
// testid , testname ,
// result , unit , normalrange , remarks
const labReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A lab report must have a patient name']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: {
        // Store age as actual number
        type: Number,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: (props) => `${props.value} is not a positive number!`
        }
    },
    testname: {
        type: String,
        required: [true, 'A lab report must have a test name'],
        trim: true
    },
    result: {
        type: Number,
        required: [true, 'A lab report must have a result']
    },
    unit: {
        type: String,
        required: [true, 'A lab report must have a unit'],
        trim: true
    },
    normalrange: {
        type: String,
        required: [true, 'A lab report must have a normal range'],
        trim: true
    }
});

labReportSchema.pre('validate', async function (next) {
    try {
        if (this.user && !this.age) {
            const user = await mongoose
                .model('User')
                .findById(this.user)
                .select('age');
            if (user && user.age) {
                this.age = user.age;
            }
        }
        next(); // ✅ Always call next()
    } catch (error) {
        console.error('Error in pre-validate hook:', error);
        next(error); // ✅ Pass error to next()
    }
});
const labReport = mongoose.model('labReport', labReportSchema);

module.exports = labReport;
