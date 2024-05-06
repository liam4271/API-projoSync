const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 

router.use(bodyParser.json());

const {createProjet, getAllProjets, getAllProjetsDetails, getProjetById, updateProjet, deleteProjet } = require('../controllers/projetController');

router.post('/projet', createProjet);
router.get('/projets', getAllProjets);
router.get('/projetComplet', getAllProjetsDetails);
router.get('/projet/:id', getProjetById);
router.put('/projet/:id', updateProjet);
router.delete('/projet/:id', deleteProjet);

const {createUtilisateur, getAllUtilisateurs, getUtilisateurById, updateUtilisateur, deleteUtilisateur } = require('../controllers/utilisateurController');

router.post('/utilisateur', createUtilisateur);
router.get('/utilisateurs', getAllUtilisateurs);
router.get('/utilisateur/:id', getUtilisateurById);
router.put('/utilisateur/:id', updateUtilisateur);
router.delete('/utilisateur/:id', deleteUtilisateur);

const {createProfileRecherche, getAllProfilesRecherches, getProfileRechercheById, updateProfileRecherche, deleteProfileRecherche } = require('../controllers/profilRechercheController');

router.post('/profileRecherche', createProfileRecherche);
router.get('/profileRecherches', getAllProfilesRecherches);
router.get('/profileRecherche/:id', getProfileRechercheById);
router.put('/profileRecherche/:id', updateProfileRecherche);
router.delete('/profileRecherche/:id', deleteProfileRecherche);

const { createCandidature, getAllCandidatures, getCandidatureById, updateCandidature, deleteCandidature } = require('../controllers/candidatureController');

router.post('/candidature', createCandidature);
router.get('/candidatures', getAllCandidatures);
router.get('/candidature/:id', getCandidatureById);
router.put('/candidature/:id', updateCandidature);
router.delete('/candidature/:id', deleteCandidature);

const { createInvitation, getAllInvitations, getInvitationById, updateInvitation, deleteInvitation } = require('../controllers/invitationController');

router.post('/invitation', createInvitation);
router.get('/invitations', getAllInvitations);
router.get('/invitation/:id', getInvitationById);
router.put('/invitation/:id', updateInvitation);
router.delete('/invitation/:id', deleteInvitation);

module.exports = router;


module.exports = router;




const { getTest, getProject, getCandidature, getInvitation } = require('../controllers/testController');

router.get('/test', getTest);
router.get('/projetC', getProject);
router.get('/candidature', getCandidature);
router.get('/invitation', getInvitation);


module.exports = router;    