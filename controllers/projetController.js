const models = require('../models/index');




// Fonction pour créer un projet
async function createProjet(req, res) {
    try {
        const projet = await models.Projet.create(req.body);
        
        res.status(201).json(projet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllProjets(req, res) {
    try {
        const projets = await models.Projet.findAll();
        res.json(projets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour récupérer tous les projets
async function getAllProjetsDetails(req, res) {
    try {
        const projets = await models.Projet.findAll({
            include: [{
                model: models.Profile_recherches,
                as: "profileProjet",
                include: {
                    model: models.Competence,
                    as: "profileCompetence",
                    attributes: { exclude: [ 'createdAt', 'updatedAt'] }
                },
                attributes: { exclude: ['competenceTrouve', 'id_projet', 'id_competence', 'createdAt', 'updatedAt'] } // Exclure l'attribut competenceTrouve du modèle Profile_recherches
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclure les attributs createdAt et updatedAt du modèle Projet
        });
        res.json(projets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour récupérer un projet par son ID
async function getProjetById(req, res) {
    const { id } = req.params;
    try {
        const projet = await models.Projet.findByPk(id);
        if (!projet) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.json(projet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour mettre à jour un projet
async function updateProjet(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await models.Projet.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedProjet = await models.Projet.findByPk(id);
            return res.json({ projet: updatedProjet });
        }
        throw new Error('Projet non trouvé');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour supprimer un projet
async function deleteProjet(req, res) {
    const { id } = req.params;
    try {
        const deleted = await models.Projet.destroy({
            where: { id }
        });
        if (!deleted) {
            throw new Error('Projet non trouvé');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProjet,
    getAllProjets,
    getAllProjetsDetails,
    getProjetById,
    updateProjet,
    deleteProjet
};
