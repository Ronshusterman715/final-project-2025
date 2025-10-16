const express = require('express');
const connectToDB = require('./DB/dbService');
const chalk = require('chalk');
const router = require('./router/router');
const { handleError } = require('./utils/handleErrors');
const corsMiddleware = require('./middlewares/cors');
const loggerMiddleWare = require('./logger/loggerService');

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("./public"))

app.use(loggerMiddleWare());

app.use(corsMiddleware);

app.use(router);

app.use((err, req, res, next) => {
    return handleError(res, 500, "Internal Server Error")
});

app.listen(process.env.PORT || PORT, () => {
    console.log(chalk.green.bold.bgYellow("app is listening to port " + (process.env.PORT || PORT)));
    connectToDB();
});

