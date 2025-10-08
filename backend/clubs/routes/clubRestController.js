const express = require('express');
const { createClub, getAllClubs, getClubById, updateClub, deleteClub, likeClub, getFavoriteClubs } = require('../models/clubsAccessDataService');
const { handleError, createError } = require('../../utils/handleErrors');
const auth = require('../../auth/authService');
const { normalizeClub } = require('../helpers/normalizeClub');
const { clubValidation } = require('../validation/clubValidationService');
const { string } = require('joi');

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

        let normalizedClub = normalizeClub(req.body, userInfo._id);
        let club = await createClub(normalizedClub);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//Get all clubs
router.get('/', async (req, res) => {
    try {
        let allClubs = await getAllClubs();
        res.status(200).send(allClubs);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//Get favorite clubs for logged in users
router.get('/favorites', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        let clubs = await getFavoriteClubs(userId);
        res.status(200).send(clubs);
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

        //TODO add if club exist

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
        res.status(200).send(club);
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
