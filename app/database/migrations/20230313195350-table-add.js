'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.addColumn('users', 'username', {
          type: Sequelize.STRING,
     });

      await queryInterface.addColumn('users', 'lastname', {
          type: Sequelize.STRING,
          allowNull: false,
     });

      await queryInterface.addColumn('users', 'phone', {
          type: Sequelize.INTEGER,
          unique:true,
          validate:{
              len:{
                  args: [9],
                  msg:"El nùmero telefonico debe tener 9 caracteres"
              }
          }
      });

      await queryInterface.addColumn('users', 'document_number', {
          type: Sequelize.INTEGER,
          unique:true,
          validate:{
              len:{
                  args: [6,10],
                  msg:"El nùmero telefonico debe ser vàlido"
              }
          }
      });

      await queryInterface.addColumn('users', 'status', {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: true,
      });

      await queryInterface.addColumn('users', 'score', {
          type: Sequelize.DOUBLE,
      });
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeColumn('users','username',{});
     await queryInterface.removeColumn('users','lastname',{});
     await queryInterface.removeColumn('users','phone',{});
     await queryInterface.removeColumn('users','document_number',{});
     await queryInterface.removeColumn('users','status',{});
     await queryInterface.removeColumn('users','score',{});

  }
};
