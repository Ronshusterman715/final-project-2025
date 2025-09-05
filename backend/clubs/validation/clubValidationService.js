const { clubValidate } = require("./JOI/clubValidate");

require("dotenv").config();

const VALIDATOR = process.env.VALIDATOR;

const clubValidation = (card) => {
    if (VALIDATOR === "joi") {
        const { error } = clubValidate(card);
        if (error) return error.details.map((detail) => detail.message);
        return "";
    }
};

module.exports = { clubValidation };