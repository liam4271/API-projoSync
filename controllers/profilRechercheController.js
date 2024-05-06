const models = require('../models/index');

// Création d'un profil de recherche
async function createProfileRecherche(req, res) {
    try {
        const profileRecherche = await models.Profile_recherches.create(req.body);
        res.status(201).json(profileRecherche);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Récupération de tous les profils de recherche
async function getAllProfilesRecherches(req, res) {
    try {
        const profilesRecherche = await models.Profile_recherches.findAll();
        res.json(profilesRecherche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupération d'un profil de recherche par son ID
async function getProfileRechercheById(req, res) {
    const { id } = req.params;
    try {
        const profileRecherche = await models.Profile_recherches.findByPk(id);
        if (!profileRecherche) {
            return res.status(404).json({ message: 'Profil de recherche non trouvé' });
        }
        res.json(profileRecherche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mise à jour d'un profil de recherche
async function updateProfileRecherche(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await models.Profile_recherches.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedProfileRecherche = await models.Profile_recherches.findByPk(id);
            return res.json({ profileRecherche: updatedProfileRecherche });
        }
        throw new Error('Profil de recherche non trouvé');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'un profil de recherche
async function deleteProfileRecherche(req, res) {
    const { id } = req.params;
    try {
        const deleted = await models.Profile_recherches.destroy({
            where: { id }
        });
        if (!deleted) {
            throw new Error('Profil de recherche non trouvé');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createProfileRecherche, getAllProfilesRecherches, getProfileRechercheById, updateProfileRecherche, deleteProfileRecherche};
