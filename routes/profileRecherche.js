const express = require('express');
const router = express.Router();

const {createProfileRecherche, getAllProfilesRecherches, getProfileRechercheById, updateProfileRecherche, deleteProfileRecherche } = require('../controllers/profilRechercheController');

router.post('/', createProfileRecherche);
router.get('/', getAllProfilesRecherches);
router.get('/:id', getProfileRechercheById);
router.put('/:id', updateProfileRecherche);
router.delete('/:id', deleteProfileRecherche);

module.exports = router;