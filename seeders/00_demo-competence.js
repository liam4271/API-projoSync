'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('competences', [{
      nom: 'producteur',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'musicien',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom: 'regisseur',
      createdAt: new Date(),
      updatedAt: new Date() 
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('competences', null, {});
  }
};
