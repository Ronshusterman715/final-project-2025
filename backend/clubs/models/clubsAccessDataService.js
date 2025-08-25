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
        let cards = await Club.find();
        return cards;
    } catch (error) {
        return createError("Mongoose", error.message, 500)
    }
};

//Get Clubs By Id
const getClubById = async (id) => {
    try {
        let card = await Club.findById(id);
        return card;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
}

//Update Clubs
const updateClub = async (cardId, updatedCard) => {
    try {
        let card = await Club.findByIdAndUpdate(cardId, updatedCard, { new: true });
        return card;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
}

//Delete Clubs
const deleteClub = async (cardId) => {
    try {
        let card = await Club.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        return createError("Mongoose", error.message)
    }
}

//Like Clubs