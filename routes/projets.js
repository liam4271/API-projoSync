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
  checkOwner,
  getAllProjetSuivi,
  getAllProjetParticipe,
  checkIsInProjet,
} = require('../controllers/projetController');

router.post('/', createProjet);
router.post('/:id/suivre', suivreProjet);
router.get('/', getAllProjets);
router.get('/me', mesProjets); //projet créé
router.get('/me/participe', getAllProjetParticipe); //projet crée et membre
router.get('/me/suivis', getAllProjetSuivi); //projet suivi
router.get('/complet', getAllProjetsDetails);
router.get('/:id', getProjetById);
router.get('/:id/countSuivis', countSuivisProjet);
router.get('/:id/me/statutSuivis', statusSuivis);
router.get('/:id/me/checkOwner', checkOwner);
router.get('/:id/me/checkIsInProjet', checkIsInProjet);
router.put('/:id', updateProjet);
router.delete('/:id', deleteProjet);

const { getTest, getProject, getCandidature, getInvitation } = require('../controllers/testController');

router.get('/test', getTest);
router.get('/projetC', getProject);
router.get('/candidature', getCandidature);
router.get('/invitation', getInvitation);

module.exports = router;
