const express = require('express');
const router = express.Router();

const {
  createCandidature,
  getAllCandidatures,
  getCandidatureById,
  updateCandidature,
  deleteCandidature,
} = require('../controllers/candidatureController');

router.post('/', createCandidature);
router.get('/', getAllCandidatures);
router.get('/:id', getCandidatureById);
router.put('/:id', updateCandidature);
router.delete('/:id', deleteCandidature);

module.exports = router;
