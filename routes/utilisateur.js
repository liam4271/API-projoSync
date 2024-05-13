const express = require('express');
const router = express.Router();

const {
  createUtilisateur,
  getAllUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
} = require('../controllers/utilisateurController');
router.post('/', createUtilisateur);
router.get('/', getAllUtilisateurs);
router.get('/:id', getUtilisateurById);
router.put('/:id', updateUtilisateur);
router.delete('/:id', deleteUtilisateur);

module.exports = router;
