const express = require('express');
const router = express.Router();

const {
  createProjet,
  getAllProjets,
  getAllProjetsDetails,
  getProjetById,
  updateProjet,
  deleteProjet,
  mesProjets,
  countSuivisProjet,
  suivreProjet,
  statusSuivis,
} = require('../controllers/projetController');

router.post('/', createProjet);
router.post('/:id/suivre', suivreProjet);
router.get('/', getAllProjets);
router.get('/me', mesProjets);
router.get('/complet', getAllProjetsDetails);
router.get('/:id', getProjetById);
router.get('/:id/countSuivis', countSuivisProjet);
router.get('/:id/me/statutSuivis', statusSuivis);
router.put('/:id', updateProjet);
router.delete('/:id', deleteProjet);

const { getTest, getProject, getCandidature, getInvitation } = require('../controllers/testController');

router.get('/test', getTest);
router.get('/projetC', getProject);
router.get('/candidature', getCandidature);
router.get('/invitation', getInvitation);

module.exports = router;
