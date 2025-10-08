const { createError } = require("../../utils/handleErrors");
const Club = require("./mongodb/Club");


//Create Club
const createClub = async (newClub) => {
    try {
        let club = new Club(newClub);
        club = await club.save();
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

//Get All Clubs
const getAllClubs = async () => {
    try {
        let clubs = await Club.find();
        return clubs;
    } catch (error) {
        return createError("Mongoose", error.message, 500)
    }
};

//Get Clubs By Id
const getClubById = async (id) => {
    try {
        let club = await Club.findById(id);
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

//Update Clubs
const updateClub = async (clubId, updatedClub) => {
    try {
        let club = await Club.findByIdAndUpdate(clubId, updatedClub, { new: true });
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

//Delete Clubs
const deleteClub = async (clubId) => {
    try {
        let club = await Club.findByIdAndDelete(clubId);
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

//Like Clubs
const likeClub = async (clubId, userId) => {
    try {
        let club = await Club.findById(clubId);
        if (!club) {
            return createError("mongoose", "Card with id " + clubId + " cannot be found in the database")
        }

        if (club.likes.includes(userId)) {
            let newLikesArray = club.likes.filter(id => id !== userId);
            club.likes = newLikesArray;
        } else {
            club.likes.push(userId);
        }

        await club.save();
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

//Get favorite clubs by user ID
const getFavoriteClubs = async (userId) => {
    try {
        let clubs = await Club.find({ likes: userId });
        return clubs;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
};

module.exports = {
    createClub,
    getAllClubs,
    getClubById,
    updateClub,
    deleteClub,
    likeClub,
    getFavoriteClubs
}