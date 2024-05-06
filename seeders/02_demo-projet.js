'use strict';

const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const utilisateur1 = await models.Utilisateur.findOne({ where: {id: '1'}})
    const utilisateur2 = await models.Utilisateur.findOne({ where: {id: '2'}})
    const utilisateur3 = await models.Utilisateur.findOne({ where: {id: '3'}})
    return queryInterface.bulkInsert('projets', [{
      nom: 'Session studio',
      statut: 'En cours',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing el',
      ville: 'Lyon',
      image: "https://images.unsplash.com/photo-1551710029-607e06bd45ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createur: utilisateur1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'Clip',
      statut: 'En cours',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing el',
      ville: 'Paris',
      image: "https://images.unsplash.com/photo-1551710029-607e06bd45ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createur: utilisateur3.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'Pochette',
      statut: 'En cours',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing el',
      ville: 'Lyon',
      image: "https://images.unsplash.com/photo-1551710029-607e06bd45ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createur: utilisateur1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projets', null, {});
  }
};
