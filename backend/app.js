const express = require('express');
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
})

app.listen(process.env.PORT || PORT, () => {
    console.log("app is listening to port " + (process.env.PORT || PORT));
})