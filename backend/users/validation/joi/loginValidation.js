const joi = require('joi');

const loginValidation = (user) => {
    const schema = joi.object({
        email: joi.string().trim().lowercase().ruleset.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).rule({
            message: "Invalid email format"
        }).required(),
        password: joi.string().trim().ruleset.regex(/^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4})(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,20}$/).rule({
            message: "Password must contain at least one uppercase letter, one lowercase letter, at least 4 numbers, and at least one special character (!@#$%^&*_-). No spaces allowed. Length: 8-20 characters."
        }).required(),
    })
    return schema.validate(user, { abortEarly: false });
};

module.exports = { loginValidation };