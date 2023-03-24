'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('user_role', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:"users",
            key:"id"
          }
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:"roles",
            key:"id"
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()')
        }
      });

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('user_role');

  }
};
