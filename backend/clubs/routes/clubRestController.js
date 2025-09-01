const express = require('express');
const { createClub, getAllClubs, getClubById, updateClub, deleteClub, likeClub } = require('../models/clubsAccessDataService');
const { handleError } = require('../../utils/handleErrors');

const router = express.Router();

//Create new club
router.post('/', async (req, res) => {
    try {
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
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let club = await updateClub(id, req.body);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let club = await deleteClub(id);
        res.status(201).send(club);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//like club
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
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