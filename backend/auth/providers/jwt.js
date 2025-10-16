const jwt = require('jsonwebtoken');
require("dotenv").config()

const SECRET_KEY = process.env.SECRET_KEY;

//Generate auth token
const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' });
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