'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
       static associate(models) {
      Post.belongsTo(models.User,{as:"author", foreignKey:"userId"})
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};















