const jwt = require('jsonwebtoken');
require("dotenv").config()

const SECRET_KEY = process.env.SECRET_KEY;

//Generate auth token
const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
    };
    //TODO change to 4h
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1m' });
    return token;
};

//Verify token
const verifyToken = (tokenFromClient) => {
    try {
        const payload = jwt.verify(tokenFromClient, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
};

module.exports = { generateAuthToken, verifyToken };