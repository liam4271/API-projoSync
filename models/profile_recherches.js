'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile_recherches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile_recherches.belongsTo(models.Competence, {
        foreignKey: 'id_competence',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'profileCompetence'
      });
      Profile_recherches.belongsTo(models.Projet, {
        foreignKey: 'id_projet',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'profileProjet'
      });
      Profile_recherches.hasMany(models.Candidature, {
        foreignKey: 'id_profile_recherche',
        as: "candidatureProfile_recherche",
      });
      Profile_recherches.hasMany(models.Invitation, {
        foreignKey: 'id_profile_recherche',
        as: "invitationProfile_recherche",
      });
    }
  }
  Profile_recherches.init({
    description: DataTypes.STRING(2500),
    competenceTrouve:{
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: true
    },
    id_projet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projets',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
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
    modelName: 'Profile_recherches',
  });
  return Profile_recherches;
};