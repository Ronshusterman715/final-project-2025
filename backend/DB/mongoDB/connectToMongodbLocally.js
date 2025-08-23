const mongoose = require('mongoose');
require('dotenv').config();

const LocalMongoAddress = process.env.MONGODB_LOCAL_URI;

const connectToLocalDB = async () => {
    try {
        await mongoose.connect(LocalMongoAddress);
        console.log("Connected to MongoDB locally successfully!");

    } catch (error) {
        console.error("Error connecting to MongoDB locally: ", error);
    }
}

module.exports = connectToLocalDB;
