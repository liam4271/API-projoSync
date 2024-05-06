'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profile_recherches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(2500)
      },
      competenceTrouve: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profile_recherches');
  }
};