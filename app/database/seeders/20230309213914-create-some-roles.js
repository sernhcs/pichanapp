'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('roles', [
          { role:"admin",createdAt:new Date(), updatedAt:new Date()},
          { role:"user",createdAt:new Date(), updatedAt:new Date()},
          { role:"supervisor",createdAt:new Date(), updatedAt:new Date()},
          { role:"guest",createdAt:new Date(), updatedAt:new Date()},
      ], {});


  },

  async down (queryInterface, Sequelize) {

      return Promise.All([
        await queryInterface.bulkDelete('roles', null, {}),

      ])

  }
};
