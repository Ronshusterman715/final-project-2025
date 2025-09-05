const morgan = require('morgan');
const currentTime = require('../../utils/timeHelper');

const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hour, minute, second } = currentTime();

    let massage = [
        `[${year}-${month}-${day} ${hour}:${minute}:${second}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        " - ",
        tokens['response-time'](req, res),
        "ms"
    ].join(" ");

    if (tokens.status(req, res) >= 400) {
        return chalk.redBright(message);
    } else return chalk.cyanBright(message);
});

module.exports = morganLogger;

