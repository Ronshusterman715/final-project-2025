const express = require('express');
const connectToDB = require('./DB/dbService');
const chalk = require('chalk');

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
})

app.listen(process.env.PORT || PORT, () => {
    console.log(chalk.green.bold.bgYellow("app is listening to port " + (process.env.PORT || PORT)));
    connectToDB();
})