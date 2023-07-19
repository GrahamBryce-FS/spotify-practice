'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tokens', [{
      access_token: 'jdshf7er4hr',
      refresh_token: 'asfghshjkfgka',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Tokens', null, {});
    
  }
};
