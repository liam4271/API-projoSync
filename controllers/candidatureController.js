const models = require('../models/index');

// Création d'une candidature
async function createCandidature(req, res, next) {
  try {
    const user = req.user;
    const candidatureData = { ...req.body, id_utilisateur: user.id };
    const candidature = await models.Candidature.create(candidatureData);
    console.log(candidature);
    res.status(201).json(candidature);
  } catch (error) {
    next(error);
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
      where: { id },
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
      where: { id },
    });
    if (!deleted) {
      throw new Error('Candidature non trouvée');
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllCandidatureOfAProjet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allCandidature = await models.Candidature.findAll({
      where: { id_projet: id },
      include: {
        model: models.Utilisateur,
        as: 'candidatureUtilisateur',
        include: {
          model: models.Competence,
          as: 'competenceUtilisateur',
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'mdp'] },
      },
    });
    res.json(allCandidature);
  } catch (err) {
    next(err);
  }
};

const acceptCandidature = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidature = await models.Candidature.findByPk(id);
    const { id_projet, id_utilisateur } = candidature;
    await models.Utilisateur_projet.create({ id_utilisateur, id_projet });
    await models.Candidature.destroy({ where: { id: id } });
    res.json(candidature);
  } catch (err) {
    next(err);
  }
};
const denyCandidature = async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.Candidature.destroy({ where: { id: id } });
    res.send(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCandidature,
  getAllCandidatures,
  getCandidatureById,
  updateCandidature,
  deleteCandidature,
  getAllCandidatureOfAProjet,
  acceptCandidature,
  denyCandidature,
};
