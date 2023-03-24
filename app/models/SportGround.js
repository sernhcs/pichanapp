'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SportGround extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SportGround.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,},
    description: DataTypes.STRING,
    adress: DataTypes.STRING,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SportGround',
    tableName: 'sport_grounds',
  });
  return SportGround;
};