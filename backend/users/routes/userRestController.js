const express = require('express');
const { handleError, createError } = require('../../utils/handleErrors');
const { registerUser, getUser, getAllUsers, loginUser } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');
const returnUser = require('../helpers/returnUser');
const { validateRegistration, validateLogin } = require('../validation/userValidationService');

const router = express.Router();

//Create New User
router.post('/register', async (req, res) => {
    try {
        let newUser = req.body;

        const errorMassage = validateRegistration(newUser);
        if (errorMassage !== "") {
            return createError("validation", errorMassage, 400);
        }

        let user = await registerUser(newUser);
        return res.status(201).send(returnUser(user));
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

//Get User By id
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        let user = await getUser(id);
        if (!userInfo.isAdmin && userInfo._id != user.user_id) {
            return createError("autorotation", "only the user himself or an admin can view this user info", 403)
        }

        return res.status(200).send(user);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

//Get All Users
router.get('/', auth, async (req, res) => {
    try {
        let userInfo = req.user;
        if (!userInfo.isAdmin) {
            return createError("autorotation", "Only admin user can view all users", 403);
        }

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

        const errorMassage = validateLogin(email, password);
        if (errorMassage !== "") {
            return createError("validation", errorMassage, 400);
        }

        const token = await loginUser(email, password);
        return res.status(200).send(token)
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

//Update User


//Delete User


module.exports = router;