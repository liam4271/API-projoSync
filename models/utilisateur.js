'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Utilisateur.belongsTo(models.Competence, {
        foreignKey: 'id_competence',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'competenceUtilisateur'
      });
      Utilisateur.hasMany(models.Projet, {
        foreignKey: 'createur',
        as: "createurProjet",
      });
      Utilisateur.hasMany(models.Candidature, {
        foreignKey: 'id_utilisateur',
        as: "candidatureUtilisateur",
      });
      Utilisateur.hasMany(models.Invitation, {
        foreignKey: 'id_utilisateur',
        as: "invitationUtilisateur",
      });
      Utilisateur.belongsToMany(models.Projet, { through: models.Utilisateur_projet, as: "utilisateurProjet", foreignKey: "id_utilisateur" })
      Utilisateur.belongsToMany(models.Projet, { through: models.Suivie, as: "suivieProjet", foreignKey: "id_utilisateur" })
    }
  }
  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {type:DataTypes.STRING, allowNull:false},
    mdp: {type:DataTypes.STRING, allowNull:false},
    insta: DataTypes.STRING,
    tel: DataTypes.STRING,
    ville: DataTypes.STRING,
    image: DataTypes.STRING,
    id_competence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'competences',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};