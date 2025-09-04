const joi = require('joi');

const registerValidation = (user) => {
    const Schema = joi.object({
        name: joi.object().keys({
            first: joi.string().min(2).max(256).required(),
            middle: joi.string().min(2).max(256).allow(""),
            last: joi.string().min(2).max(256).required(),
        }).required(),
        phone: joi.string().ruleset.regex(/^(?:\+972|0)(5\d|([2-4]|[7-9]))-?\d{7}$/).rule({ message: 'Invalid israel phone number' }).required(),
        email: joi.string().trim().lowercase().ruleset.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).rule({
            message: "Invalid email format"
        }).required(),
        password: joi.string().trim().ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).rule({
            message: "Password must contain at least one uppercase letter, lowercase letter, number and special character (@$!%*?&). Length: 8-20 characters."
        }).required(),
        image: joi.object({
            url: joi.string().trim().lowercase().ruleset.regex(
                /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
            ).rule({ message: "Image must contain a valid url" }).allow(""),
            alt: joi.string().min(2).max(256).allow(""),
        }).required(),
        isAdmin: joi.boolean().allow(""),
    });
    return Schema.validate(user);
};

module.exports = { registerValidation };