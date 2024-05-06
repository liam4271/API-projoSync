'use strict';

const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const competence1 = await models.Competence.findOne({ where: {id: '1'}})
    const competence2 = await models.Competence.findOne({ where: {id: '2'}})
    const competence3 = await models.Competence.findOne({ where: {id: '3'}})
    const projet1 = await models.Projet.findOne({ where: {id: '1'}})
    const projet2 = await models.Projet.findOne({ where: {id: '2'}})
    const projet3 = await models.Projet.findOne({ where: {id: '3'}})
    return queryInterface.bulkInsert('profile_recherches', [{
      description: 'Lorem ipsum dolor sit amet, consectetur adip id, sed diam nonumy eirmod tempor',
      competenceTrouve: false,
      id_competence: competence2.id,
      id_projet: projet1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Lorem ipsum dolor sit am et, consectetur adip id',
      competenceTrouve: false,
      id_competence: competence1.id,
      id_projet: projet2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Lorem ipsum dolor sit am et, consectetur adip id, sed diam nonumy eirm od sed diam',
      competenceTrouve: true,
      id_competence: competence3.id,
      id_projet: projet3.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('profile_recherches', null, {});
  }
};
