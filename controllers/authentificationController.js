const passport = require('passport');
const models = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const authLogin = async ({ email, password }) => {
  try {
    const user = await models.Utilisateur.findOne({ where: { email } });
    if (!user) {
      throw new Error('mot de passe ou email incorrect');
    }
    const passwordMatch = await bcrypt.compare(password, user.mdp);

    if (!passwordMatch) {
      throw new Error('mot de passe ou email incorrect');
    }

    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const registerFct = async ({ email, nom, prenom, tel, ville, mdp }) => {
  try {
    const hashPassword = await bcrypt.hash(mdp, 10);
    const utilisateur = await models.Utilisateur.create({ email, nom, prenom, tel, ville, mdp: hashPassword });
    return utilisateur;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur register');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, mdp } = req.body;
    const token = await authLogin({ email, password: mdp });
    res.json({ token, status: 'success' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await registerFct(req.body);
    // const token = await authLogin({ email: user.email, password: req.body.mdp });
    res.json({ user: { ...user.dataValues, mdp: undefined }, status: 'success' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { login, register };
