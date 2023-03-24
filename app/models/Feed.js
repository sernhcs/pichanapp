'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feed.init({
    feed: DataTypes.STRING,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },

  }, {
    sequelize,
    modelName: 'Feed',
    tableName: 'feeds',
  });
  return Feed;
};