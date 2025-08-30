const express = require('express');
const clubRouter = require('../clubs/routes/clubRestController');
const userRouter = require('../users/routes/userRestController');
const { handleError } = require('../utils/handleErrors');

const router = express.Router();

router.use("/clubs", clubRouter);
router.use("/users", userRouter);

router.use((req, res) => {
    return handleError(res, 404, "Page not found")
});

module.exports = router;