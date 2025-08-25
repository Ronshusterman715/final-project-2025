const mongoose = require('mongoose');
require('dotenv').config();

// TODO: add atlas connection string to .env file
const connectionStringForAtlas = process.env.MONGODB_ATLAS_URI;

const connectToAtlasDB = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log(chalk.bold.white.bgRed("Connected to MongoDB Atlas successfully!"));

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas: ", error);
    }
}

module.exports = connectToAtlasDB;
