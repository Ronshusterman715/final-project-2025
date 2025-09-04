const joi = require('joi');

const loginValidation = (user) => {
    const schema = joi.object({
        email: joi.string().trim().lowercase().ruleset.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).rule({
            message: "Invalid email format"
        }).required(),
        password: joi.string().trim().ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).rule({
            message: "Password must contain at least one uppercase letter, lowercase letter, number and special character (@$!%*?&). Length: 8-20 characters."
        }).required(),
    })
    return schema.validate(user, { abortEarly: false });
};

module.exports = { loginValidation };