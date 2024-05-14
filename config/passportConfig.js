require('dotenv').config();
const models = require('../models/index');
const { ExtractJwt, Strategy } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (playload, done) => {
      try {
        const user = await models.Utilisateur.findByPk(playload.id, { attributes: { exclude: ['mdp'] } });
        if (user) {
          return done(null, user);
        }
        if (!user) {
          throw new Error('Erreur de connexion');
        }
      } catch (err) {
        return done(err);
      }
    })
  );
};
