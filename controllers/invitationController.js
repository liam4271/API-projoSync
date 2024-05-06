const models = require('../models/index');
const { Invitation } = require('../models');

// Création d'une invitation
async function createInvitation(req, res) {
    try {
        const invitation = await models.Invitation.create(req.body);
        res.status(201).json(invitation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Récupération de toutes les invitations
async function getAllInvitations(req, res) {
    try {
        const invitations = await models.Invitation.findAll();
        res.json(invitations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupération d'une invitation par son ID
async function getInvitationById(req, res) {
    const { id } = req.params;
    try {
        const invitation = await models.Invitation.findByPk(id);
        if (!invitation) {
            return res.status(404).json({ message: 'Invitation non trouvée' });
        }
        res.json(invitation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mise à jour d'une invitation
async function updateInvitation(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await models.Invitation.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedInvitation = await models.Invitation.findByPk(id);
            return res.json({ invitation: updatedInvitation });
        }
        throw new Error('Invitation non trouvée');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'une invitation
async function deleteInvitation(req, res) {
    const { id } = req.params;
    try {
        const deleted = await models.Invitation.destroy({
            where: { id }
        });
        if (!deleted) {
            throw new Error('Invitation non trouvée');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createInvitation, getAllInvitations, getInvitationById, updateInvitation, deleteInvitation};
