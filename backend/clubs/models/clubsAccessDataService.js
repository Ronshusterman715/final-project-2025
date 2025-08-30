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
}

//Update Clubs
const updateClub = async (clubId, updatedClub) => {
    try {
        let club = await Club.findByIdAndUpdate(clubId, updatedClub, { new: true });
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
}

//Delete Clubs
const deleteClub = async (clubId) => {
    try {
        let club = await Club.findByIdAndDelete(clubId);
        return club;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
}

//Like Clubs


module.exports = {
    createClub,
    getAllClubs,
    getClubById,
    updateClub,
    deleteClub
}