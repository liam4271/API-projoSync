'use strict';

const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const utilisateur1 = await models.Utilisateur.findOne({ where: {id: '1'}})
    const utilisateur2 = await models.Utilisateur.findOne({ where: {id: '2'}})
    const utilisateur3 = await models.Utilisateur.findOne({ where: {id: '3'}})
    const projet1 = await models.Projet.findOne({ where: {id: '1'}})
    const projet2 = await models.Projet.findOne({ where: {id: '2'}})
    const projet3 = await models.Projet.findOne({ where: {id: '3'}})
    return queryInterface.bulkInsert('utilisateur_projets', [{
      id_utilisateur: utilisateur1.id,
      id_projet: projet1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_utilisateur: utilisateur3.id,
      id_projet: projet2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_utilisateur: utilisateur1.id,
      id_projet: projet3.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_utilisateur: utilisateur2.id,
      id_projet: projet2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_utilisateur: utilisateur2.id,
      id_projet: projet1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_utilisateur: utilisateur2.id,
      id_projet: projet3.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('utilisateur_projets', null, {});
  }
};
