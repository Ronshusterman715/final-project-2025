const mongoose = require('mongoose');
const { DEFAULT_VALIDATION } = require('./mongooseValidator');

const Address = new mongoose.Schema({
    country: DEFAULT_VALIDATION,
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        min: 1,
    },
});

module.exports = Address;