'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('users', 'phone', {
      type: Sequelize.STRING,
      unique:false,

    });

    await queryInterface.changeColumn('users', 'document_number', {
      type: Sequelize.STRING,
      unique:false,

    });

    await queryInterface.changeColumn('users', 'status', {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 1,

    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('users','phone',{});
    await queryInterface.removeColumn('users','document_number',{});
    await queryInterface.removeColumn('users','status',{});

  }
};
