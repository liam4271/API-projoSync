const express = require('express');
const router = express.Router();

const {
  createCandidature,
  getAllCandidatures,
  getCandidatureById,
  updateCandidature,
  deleteCandidature,
  getAllCandidatureOfAProjet,
  acceptCandidature,
  denyCandidature,
} = require('../controllers/candidatureController');

router.post('/', createCandidature);
router.get('/', getAllCandidatures);
router.get('/projet/:id', getAllCandidatureOfAProjet);
router.get('/:id', getCandidatureById);
router.post('/accept/:id', acceptCandidature);
router.post('/deny/:id', denyCandidature);
router.put('/:id', updateCandidature);
router.delete('/:id', deleteCandidature);

module.exports = router;
