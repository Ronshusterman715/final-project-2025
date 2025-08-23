const mongoose = require('mongoose');
const Name = require('../../../helpers/mongodb/Name');
const { PHONE_VALIDATION, EMAIL_VALIDATION } = require('../../../helpers/mongodb/mongooseValidator');
const Image = require('../../../helpers/mongodb/Images');

const userSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        match: (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    },
    image: Image,
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})