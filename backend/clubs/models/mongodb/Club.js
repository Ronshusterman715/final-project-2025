const mongoose = require('mongoose');
const { DEFAULT_VALIDATION, PHONE_VALIDATION, EMAIL_VALIDATION } = require('../../../helpers/mongodb/mongooseValidator');
const Address = require('../../../helpers/mongodb/Address');
const Image = require('../../../helpers/mongodb/Images');

const clubSchema = new mongoose.Schema({
    name: DEFAULT_VALIDATION,
    description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
    type: DEFAULT_VALIDATION,
    ageRequirement: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 11,
    },
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    openDays: DEFAULT_VALIDATION,
    openHours: DEFAULT_VALIDATION,
    image: Image,
    address: Address,
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;