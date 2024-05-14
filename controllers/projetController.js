const models = require('../models/index');

// Fonction pour créer un projet
async function createProjet(req, res, next) {
  try {
    const { profilRecherche, ...projetData } = req.body;
    const projet = await models.Projet.create({ ...projetData, createur: req.user.id });
    if (profilRecherche && profilRecherche.length !== 0) {
      const promises = profilRecherche.map(async (profil) => {
        const { competence, description } = profil;
        const competenceCreate = await models.Competence.create({ nom: competence });
        return projet.createProfileProjet({
          description,
          competenceTrouve: false,
          id_competence: competenceCreate.id,
        });
      });
      await Promise.all(promises);
    }
    res.status(201).json(projet);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getAllProjets(req, res) {
  try {
    console.log(req.user);
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
      include: [
        {
          model: models.Profile_recherches,
          as: 'profileProjet',
          include: {
            model: models.Competence,
            as: 'profileCompetence',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          attributes: { exclude: ['competenceTrouve', 'id_projet', 'id_competence', 'createdAt', 'updatedAt'] }, // Exclure l'attribut competenceTrouve du modèle Profile_recherches
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclure les attributs createdAt et updatedAt du modèle Projet
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
    const projet = await models.Projet.findByPk(id, {
      include: {
        model: models.Profile_recherches,
        as: 'profileProjet',
        include: {
          model: models.Competence,
          as: 'profileCompetence',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        attributes: { exclude: ['competenceTrouve', 'id_projet', 'id_competence', 'createdAt', 'updatedAt'] },
      },
    });
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
      where: { id },
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
      where: { id },
    });
    if (!deleted) {
      throw new Error('Projet non trouvé');
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const mesProjets = async (req, res, next) => {
  console.log('mes projet');
  const user = req.user;
  try {
    const projets = await models.Projet.findAll({ where: { createur: user.id } });
    console.log(projets);
    res.json(projets);
  } catch (err) {
    next(err);
  }
};

const countSuivisProjet = async (req, res, next) => {
  const { id } = req.params;
  try {
    const projet = await models.Projet.findByPk(id);
    if (!projet) {
      throw new Error('Pas de projet trouvé');
    }
    const count = await models.Suivie.count({ where: { id_projet: projet.id } });
    res.json(count);
  } catch (err) {
    next(err);
  }
};

const suivreProjet = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const projet = await models.Projet.findByPk(id);
    const dejaSuivis = await projet.hasSuivieProjet(user);
    if (dejaSuivis) {
      await projet.removeSuivieProjet(user);
    } else {
      await projet.addSuivieProjet(user);
    }
    res.json({ status: 'success' });
    if (!projet) {
      throw new Error('Pas de projet trouvé');
    }
  } catch (err) {
    next(err);
  }
};

const statusSuivis = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const projet = await models.Projet.findByPk(id);
    const dejaSuivis = await projet.hasSuivieProjet(user);
    res.json(dejaSuivis);
  } catch (err) {
    next(err);
  }
};

const checkOwner = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const projet = await models.Projet.findByPk(id);
    const isOwner = projet.createur === user.id;
    res.json(isOwner);
  } catch (err) {
    next(err);
  }
};

const checkIsInProjet = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const data = await models.Utilisateur_projet.findOne({ where: { id_utilisateur: user.id, id_projet: id } });
    const isInProjet = data ? true : false;
    console.log(data);
    res.json(isInProjet);
  } catch (err) {
    next(err);
  }
};
const getAllProjetSuivi = async (req, res, next) => {
  try {
    const user = req.user;
    const allProjetSuivi = await user.getSuivieProjet();
    console.log(allProjetSuivi);
    res.json(allProjetSuivi);
  } catch (err) {
    next(err);
  }
};

const getAllProjetParticipe = async (req, res, next) => {
  try {
    const user = req.user;
    const allProjetMembre = await user.getUtilisateurProjet();
    const allProjetCree = await models.Projet.findAll({ where: { createur: user.id } });
    const allProjet = [...allProjetMembre, ...allProjetCree];
    res.json(allProjet);
  } catch (err) {
    next(err);
  }
};
module.exports = {
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
};
