const models = require('../models/index');


// Création d'un utilisateur
async function createUtilisateur(req, res) {
    try {
        const utilisateur = await models.Utilisateur.create(req.body);
        res.status(201).json(utilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Récupération de tous les utilisateurs
async function getAllUtilisateurs(req, res) {
    try {
        const utilisateurs = await models.Utilisateur.findAll();
        res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupération d'un utilisateur par son ID
async function getUtilisateurById(req, res) {
    const { id } = req.params;
    try {
        const utilisateur = await models.Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mise à jour d'un utilisateur
async function updateUtilisateur(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await models.Utilisateur.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedUtilisateur = await models.Utilisateur.findByPk(id);
            return res.json({ utilisateur: updatedUtilisateur });
        }
        throw new Error('Utilisateur non trouvé');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'un utilisateur
async function deleteUtilisateur(req, res) {
    const { id } = req.params;
    try {
        const deleted = await models.Utilisateur.destroy({
            where: { id }
        });
        if (!deleted) {
            throw new Error('Utilisateur non trouvé');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createUtilisateur, getAllUtilisateurs, getUtilisateurById, updateUtilisateur, deleteUtilisateur};
