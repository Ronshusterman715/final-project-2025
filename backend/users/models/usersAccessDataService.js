const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePasswords } = require("../helpers/bcrypt");
const User = require("./mongodb/User");


//Register New User
const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        return user;
    } catch (error) {
        return createError("mongoose", error.message)
    }
};


//Get User By id
const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        return createError("mongoose", error.message)
    }
};

//Get All Users
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return createError("mongoose", error.message)
    }
};

//Login User
const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email });
        if (!userFromDB) {
            return createError("Authentication", "User not exist", 401);
        }

        if (!comparePasswords(password, userFromDB.password)) {
            return createError("Authentication", "invalid email or password", 403);
        }

        const token = generateAuthToken(userFromDB)
        return token;
    } catch (error) {
        return createError("Authentication", error.message);
    }
};

//Update User
const updateUser = async (userId, updatedUser) => {
    try {
        const userFromDB = await User.findById(userId);
        if (!userFromDB) {
            return createError("Authentication", "User not exist", 400);
        }

        let user = await User.findByIdAndUpdate(userId, updatedUser)
        user = await user.save();
        return user;
    } catch (error) {
        return createError("mongoose", error.message)
    }
};

//Delete User
const deleteUser = async (id) => {
    let user = await User.findById(id);

    if (!user) {
        return createError("Authentication", "User not exist", 400);
    }

    user = await User.findByIdAndDelete(id);
    return user;
};

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
};