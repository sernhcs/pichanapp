'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          isAlpha:{
            msg:"nombre solo puede contener letras"
          },
          len:{
            args:[2,255],
            msg:"elnombre tiene que tener minimo 2 caracteres"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          len:{
            args: [6,255],
            msg:"la contraseña debe ser minimamente 6 caracteres"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
          isEmail:{
            msg:"el email tiene que ser valido"
          }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};