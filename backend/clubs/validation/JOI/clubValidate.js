const joi = require('joi');

const clubValidate = (club) => {
    const schema = joi.object({
        name: joi.string().min(2).max(256).required(),
        description: joi.string().min(2).max(1024).required(),
        type: joi.string().min(2).max(256).required(),
        phone: joi.string().ruleset.regex(/^(?:\+972|0)(5\d|([2-4]|[7-9]))-?\d{7}$/).rule({ message: 'Invalid israel phone number' }).required(),
        email: joi.string().trim().lowercase().ruleset.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).rule({
            message: "Invalid email format"
        }).required(),
        ageRequirement: joi.string().min(1).max(11).required(),
        openDays: joi.string().min(2).max(256).required(),
        openHours: joi.string().min(2).max(256).required(),
        image: joi.object({
            url: joi.string().trim().lowercase().ruleset.regex(
                /^((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?|\/public\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp))$/
            ).rule({ message: "Image must contain a valid url" }).allow(""),
            alt: joi.string().min(2).max(256).allow(""),
        }).required(),
        address: joi.object({
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().min(1).required(),
            floor: joi.number().min(0),
        }).required(),
    });
    return schema.validate(club, { abortEarly: false });
};

module.exports = { clubValidate };