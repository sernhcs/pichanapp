'use strict';
const {  Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post,{as:"posts",foreignKey:"userId"});
      User.belongsToMany(models.Role,{as:"roles",through:"user_role", foreignKey:"user_id"});
    };
    // comprubea si el suario es administrador
    static isAdmin(roles){
      let tmpArray=[];
      roles.forEach(role => tmpArray.push(role.role));
      return tmpArray.includes('admin');
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    username: {
      type: DataTypes.STRING,

    },
    lastname: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    password: DataTypes.STRING,
    email: {
      allowNull:false,
      type:DataTypes.STRING
    },
    phone:{
      type: DataTypes.STRING,

    },
    document_number:{
      type: DataTypes.STRING,

    },
    status:{
      type: DataTypes.TINYINT(1),
      defaultValue: true,

    },
    score:{
      type: DataTypes.DOUBLE,
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};

















