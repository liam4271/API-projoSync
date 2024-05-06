'use strict';

const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const competence1 = await models.Competence.findOne({ where: {id: '1'}})
    const competence2 = await models.Competence.findOne({ where: {id: '2'}})
    const competence3 = await models.Competence.findOne({ where: {id: '3'}})
    return queryInterface.bulkInsert('utilisateurs', [{
      nom: 'steph',
      prenom: 'ahhh',
      email: 'example@example.com',
      mdp:"test",
      insta: "@example.com",
      ville: "lyon",
      tel: "0777360535",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id_competence: competence1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'Joluchn',
      prenom: 'Dzdaoe',
      email: 'example1@example.com',
      mdp:"test1",
      insta: "@example1.com",
      ville: "lyon",
      tel: "0777360535",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id_competence: competence3.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'Johzdn',
      prenom: 'Dzdoe',
      email: 'exemple2@example.com',
      mdp:"test2",
      insta: "@example2.com",
      ville: "lyon",
      tel: "0777360535",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id_competence: competence2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('utilisateurs', null, {});
  }
};
