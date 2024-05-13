const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de l'authentification.", status: 'error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Token invalide ou utilisateur non autorisé.', status: 'error' });
    }
    req.user = user;
    next();
  })(req, res, next);
};
