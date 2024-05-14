const express = require('express');
const router = express.Router();

const { getAllCompetence } = require('../controllers/competenceController');

router.get('/', getAllCompetence);

module.exports = router;
