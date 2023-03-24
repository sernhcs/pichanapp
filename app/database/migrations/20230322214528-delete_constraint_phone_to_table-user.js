'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'phone')

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      type: 'UNIQUE',
      fields: ['phone'],
      name: 'phone',
    })
  }
};
