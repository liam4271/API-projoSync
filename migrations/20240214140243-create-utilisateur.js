'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Utilisateurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mdp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      insta: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      id_competence: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'competences',
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
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Utilisateurs');
  }
};