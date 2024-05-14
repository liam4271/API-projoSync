const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passportConfig')(passport);
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

const ProjetRoute = require('./routes/projets');
const CandidatureRoute = require('./routes/candidature');
const InvitationRoute = require('./routes/invitations');
const ProfileRechercheRoute = require('./routes/profileRecherche');
const UtilisateurRoute = require('./routes/utilisateur');
const AuthentificationRoute = require('./routes/authentification');
const meRoute = require('./routes/me');
const competenceRoute = require('./routes/competence');
const checkJwt = require('./middleware/checkJwt');

app.use('/authentification', AuthentificationRoute);
app.use('/competence', competenceRoute);
app.use('/me', checkJwt, meRoute);
app.use('/projet', checkJwt, ProjetRoute);
app.use('/candidature', checkJwt, CandidatureRoute);
app.use('/invitation', checkJwt, InvitationRoute);
app.use('/profileRecherche', checkJwt, ProfileRechercheRoute);
app.use('/users', checkJwt, UtilisateurRoute);
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ressource introuvable' });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: err.message });
});

app.listen(process.env.PORT || 3001, function () {
  console.log('Example app listening on port !');
});
