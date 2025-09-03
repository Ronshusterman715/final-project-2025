const express = require('express');
const connectToDB = require('./DB/dbService');
const chalk = require('chalk');
const router = require('./router/router');
const { handleError } = require('./utils/handleErrors');
const corsMiddleware = require('./middlewares/cors');

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("./public"))

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`);
    next();
});

app.use(corsMiddleware);

app.use(router);

app.use((err, req, res, next) => {
    console.log(err);
    return handleError(res, 500, "Internal Server Error")
});

app.listen(process.env.PORT || PORT, () => {
    console.log(chalk.green.bold.bgYellow("app is listening to port " + (process.env.PORT || PORT)));
    connectToDB();
});

