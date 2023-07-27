'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tokens', "expires_in",{
      type: Sequelize.INTEGER,
      allowNull: true,
  });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tokens", "expires_in")
  }
};
