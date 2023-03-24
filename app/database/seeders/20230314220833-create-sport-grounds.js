'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('sport_grounds', [
        { name:"mar",adress:"mz b lo",createdAt:new Date(), updatedAt:new Date()},
        { name:"cas",adress:"mz b 1lo",createdAt:new Date(), updatedAt:new Date()},

      ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('sport_grounds', null, {});

  }
};
