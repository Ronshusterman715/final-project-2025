const connectToAtlasDB = require('./mongoDB/connectToAtlas');
const connectToLocalDB = require('./mongoDB/connectToMongodbLocally');

require('dotenv').config();

const ENVIRONMENT = process.env.ENVIRONMENT;
const DB = process.env.DB;

const connectToDB = async () => {
    if (DB === "MONGODB") {
        if (ENVIRONMENT === "development") {
            await connectToLocalDB();
        }
        if (ENVIRONMENT === "production") {
            await connectToAtlasDB();
        }
    }
}

module.exports = connectToDB;