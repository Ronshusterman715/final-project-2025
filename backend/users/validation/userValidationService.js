const { loginValidation } = require("./joi/loginValidation");
const { registerValidation } = require("./joi/registerValidation");
require("dotenv").config();

const VALIDATOR = process.env.VALIDATOR;

const validateRegistration = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = registerValidation(user);
        if (error) return error.details.map((detail) => detail.message);
        return "";
    }
};

const validateLogin = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = loginValidation(user);
        if (error) return error.details.map((detail) => detail.message)
        return "";
    }
};

module.exports = {
    validateRegistration,
    validateLogin,
};