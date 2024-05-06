'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message_invitation: {
        type: Sequelize.STRING(1500)
      },
      id_projet: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'projets',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      id_utilisateur: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'utilisateurs',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      id_profile_recherche: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'profile_recherches',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invitations');
  }
};