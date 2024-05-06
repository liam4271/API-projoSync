'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.belongsTo(models.Projet, {
        foreignKey: 'id_projet',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'invitationProjet'
      });
      Invitation.belongsTo(models.Utilisateur, {
        foreignKey: 'id_utilisateur',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'invitationUtilisateur'
      });
      Invitation.belongsTo(models.Profile_recherches, {
        foreignKey: 'id_profile_recherche',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'invitationProfile_recherche'
      });
    }
  }
  Invitation.init({
    message_invitation: DataTypes.STRING(1500),
    id_projet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projets',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateurs',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    id_profile_recherche: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'profile_recherches',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};