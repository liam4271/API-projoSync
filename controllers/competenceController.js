const models = require('../models/index');

const getAllCompetence = async (req, res, next) => {
  try {
    const allCompetence = await models.Competence.findAll();
    res.json(allCompetence);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCompetence };
