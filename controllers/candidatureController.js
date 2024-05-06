const models = require('../models/index');



// Création d'une candidature
async function createCandidature(req, res) {
    try {
        const candidature = await models.Candidature.create(req.body);
        res.status(201).json(candidature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Récupération de toutes les candidatures
async function getAllCandidatures(req, res) {
    try {
        const candidatures = await models.Candidature.findAll();
        res.json(candidatures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupération d'une candidature par son ID
async function getCandidatureById(req, res) {
    const { id } = req.params;
    try {
        const candidature = await models.Candidature.findByPk(id);
        if (!candidature) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }
        res.json(candidature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mise à jour d'une candidature
async function updateCandidature(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await Candidature.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedCandidature = await Candidature.findByPk(id);
            return res.json({ candidature: updatedCandidature });
        }
        throw new Error('Candidature non trouvée');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'une candidature
async function deleteCandidature(req, res) {
    const { id } = req.params;
    try {
        const deleted = await models.Candidature.destroy({
            where: { id }
        });
        if (!deleted) {
            throw new Error('Candidature non trouvée');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createCandidature, getAllCandidatures, getCandidatureById, updateCandidature, deleteCandidature};
