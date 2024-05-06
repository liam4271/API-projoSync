'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projet.belongsTo(models.Utilisateur, {
        foreignKey: 'createur',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "createurProjet",
      });
      Projet.hasMany(models.Profile_recherches, {
        foreignKey: 'id_projet',
        as: 'profileProjet'
      });
      Projet.hasMany(models.Candidature, {
        foreignKey: 'id_projet',
        as: 'candidatureProjet'
      });
      Projet.hasMany(models.Invitation, {
        foreignKey: 'id_projet',
        as: 'invitationProjet'
      });
      Projet.belongsToMany(models.Utilisateur, { through: models.Utilisateur_projet, as: "utilisateurProjet", foreignKey: "id_projet" });
      Projet.belongsToMany(models.Utilisateur, { through: models.Suivie, as: "suivieProjet", foreignKey: "id_projet" });
    }
  }
  Projet.init({
    nom: DataTypes.STRING,
    statut: DataTypes.STRING,
    ville: DataTypes.STRING,
    description: DataTypes.STRING(2500),
    image: DataTypes.STRING,
    createur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateurs',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Projet',
  });
  return Projet;
};