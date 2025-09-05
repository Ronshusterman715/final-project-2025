const morganLogger = require("./morgan/morganLogger");

require("dotenv").config();

const LOGGER = process.env.LOGGER;

const loggerMiddleWare = () => {
    if (LOGGER === "morgan") {
        return morganLogger
    }
};

module.exports = loggerMiddleWare;