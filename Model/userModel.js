const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// name, dob, address, email, password, mobile number

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

const userSchema = mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    passwordChangedAt: {
        type: Date
    },
    age: {}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = undefined;
    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (next) {
    try {
        // Calculate age from dob whenever document is saved
        if (this.dob && (this.isModified('dob') || !this.age)) {
            this.age = calculateAge(this.dob);
            console.log(`Age calculated: ${this.age} from DOB: ${this.dob}`);
        }

        // Handle password hashing
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;

        if (!this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
        }

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
