'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init({
    userId: {
      type:DataTypes.STRING,
      required: true,
      ref: "user",
    },
    token: {
      type:DataTypes.STRING,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  }, {
    sequelize,
    tableName:'tokens',
    modelName: 'Token',
  });
  return Token;
};