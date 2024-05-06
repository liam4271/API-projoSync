const models = require('../models/index');

const getTest = async (req, res) => {
    const project = await models.Projet.findOne({where:{id:"1"}})
    res.json(project)
};


const getProject = async (req, res) => { 
    const project = await models.Projet.findOne({where:{id:"1"}, include: [{model:models.Utilisateur, as:"utilisateurProjet"}, {model:models.Utilisateur, as:"createurProjet"}, {model:models.Utilisateur, as:"suivieProjet"}, {model:models.Profile_recherches, as:"profileProjet", include: {model:models.Competence, as:"profileCompetence"}}, ]})
    res.json(project)
};

const getCandidature = async (req, res) => { 
    const project = await models.Candidature.findOne({where:{id:"1"}, include: [{model:models.Projet, as:"candidatureProjet"}, {model:models.Utilisateur, as:"candidatureUtilisateur"}, {model:models.Profile_recherches, as:"candidatureProfile_recherche"}] })
    res.json(project)
};

const getInvitation = async (req, res) => { 
    const project = await models.Invitation.findOne({where:{id:"1"}, include: [{model:models.Projet, as:"invitationProjet"}, {model:models.Utilisateur, as:"invitationUtilisateur"}, {model:models.Profile_recherches, as:"invitationProfile_recherche"}] })
    res.json(project)
};


module.exports = { getTest, getCandidature, getProject, getInvitation };