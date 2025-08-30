const mongoose = require('mongoose');

const OPDSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uhid: {
        type: String
    },
    age: {
        type: Number
    },
    bp: {
        type: String,
        required: true
    },
    pulse: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: (props) => `${props.value} is not a valid weight in kg!`
        }
    },
    spo2: {
        type: Number,
        required: true
    },
    complaints: {
        type: [String],
        required: true
    },
    diagnosis: {
        type: [String],
        required: true
    },
    prescriptions: [
        {
            medicine: { type: String, required: true },
            dosage: { type: String, required: true },
            timing: { type: String, required: true }
        }
    ],
    advices: {
        type: [String],
        required: true
    },
    tests_prescribed: {
        type: [String],
        required: true
    },
    follow_up: {
        type: Date,
        required: true
    }
});

// Pre-validate middleware to auto-populate uhid and fetch age from User
OPDSchema.pre('validate', async function (next) {
    try {
        if (this.user && (!this.uhid || !this.age)) {
            // Fetch only needed fields: _id, age, name
            const user = await mongoose
                .model('User')
                .findById(this.user)
                .select('_id age name');

            if (user) {
                // Set uhid to user's MongoDB _id
                if (!this.uhid) {
                    this.uhid = user._id.toString();
                    console.log('UHID set to:', this.uhid);
                }

                // Directly fetch age from User document
                if (!this.age) {
                    this.age = user.age;
                    console.log('Age fetched from User:', this.age);
                }

                // Auto-populate name if not provided
                if (!this.name && user.name) {
                    this.name = user.name;
                    console.log('Name populated:', this.name);
                }
            } else {
                return next(new Error('User not found'));
            }
        }
        next();
    } catch (error) {
        console.error('Error in OPD pre-validate hook:', error);
        next(error);
    }
});

const OPD = mongoose.model('OPD', OPDSchema);

module.exports = OPD;
