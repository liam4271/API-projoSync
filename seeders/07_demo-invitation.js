'use strict';

const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const utilisateur1 = await models.Utilisateur.findOne({ where: {id: '1'}})
    const utilisateur2 = await models.Utilisateur.findOne({ where: {id: '2'}})
    const utilisateur3 = await models.Utilisateur.findOne({ where: {id: '3'}})
    const profile_recherches1 = await models.Profile_recherches.findOne({ where: {id: '1'}})
    const profile_recherches2 = await models.Profile_recherches.findOne({ where: {id: '2'}})
    const profile_recherches3 = await models.Profile_recherches.findOne({ where: {id: '3'}})
    const projet1 = await models.Projet.findOne({ where: {id: '1'}})
    const projet2 = await models.Projet.findOne({ where: {id: '2'}})
    const projet3 = await models.Projet.findOne({ where: {id: '3'}})
    return queryInterface.bulkInsert('invitations', [{
      message_invitation: 'Lorem ipsum dolor sit amet, consectetur adip',
      id_projet: projet1.id,
      id_utilisateur: utilisateur2.id,
      id_profile_recherche: profile_recherches1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      message_invitation: 'Lorem ipsum dolor',
      id_projet: projet1.id,
      id_utilisateur: utilisateur3.id,
      id_profile_recherche: profile_recherches1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },


  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('invitations', null, {});
  }
};
