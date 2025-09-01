const express = require('express');
const { handleError } = require('../../utils/handleErrors');
const { registerUser, getUser, getAllUsers, loginUser } = require('../models/usersAccessDataService');

const router = express.Router();

//Create New User
router.post('/register', async (req, res) => {
    try {
        let newUser = req.body;
        let user = await registerUser(newUser);
        return res.status(201).send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

//Get User By id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user = await getUser(id);
        return res.status(200).send(user);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

//Get All Users
router.get('/', async (req, res) => {
    try {
        let users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//Login user
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        const token = await loginUser(email, password);
        return res.status(200).send(token)
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

//Update User


//Delete User


module.exports = router;