const express = require('express');
const { createClub, getAllClubs, getClubById, updateClub, deleteClub, likeClub } = require('../models/clubsAccessDataService');
const { handleError, createError } = require('../../utils/handleErrors');
const auth = require('../../auth/authService');
const { normalizeClub } = require('../helpers/normalizeClub');
const { clubValidation } = require('../validation/clubValidationService');

const router = express.Router();

//Create new club
router.post('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return createError("authorization", "Only Admin users can create clubs", 403)
        }

        const errorMassage = clubValidation(req.body);
        if (errorMassage) {
            return createError("validation", errorMassage, 400)
        }

        let club = await createClub(req.body);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//Get all cards
router.get('/', async (req, res) => {
    try {
        let allClubs = await getAllClubs();
        res.status(200).send(allClubs);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});


//Get club by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let club = await getClubById(id);
        res.status(200).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//Update club
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        if (!userInfo.isAdmin) {
            return createError("authorization", "Only Admin users can update clubs", 403)
        }

        const errorMassage = clubValidation(req.body);
        if (errorMassage) {
            return createError("validation", errorMassage, 400)
        }


        let normalizedClub = normalizeClub(req.body, userInfo._id);
        let club = await updateClub(id, normalizedClub);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//delete
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        if (!userInfo.isAdmin) {
            return createError("authorization", "Only Admin users can delete clubs", 403)
        }

        let club = await deleteClub(id);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//like club
router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;

        if (!userInfo._id) {
            return createError("authorization", "only logged in users can like clubs", 403)
        }

        const userId = userInfo._id;

        let club = await likeClub(id, userId);
        res.status(200).send(club);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

module.exports = router;


// TODO: remove REST Client test below
// GET http://localhost:3000/clubs

// POST http://localhost:3000/
// Content-Type: application/json

// {

// }