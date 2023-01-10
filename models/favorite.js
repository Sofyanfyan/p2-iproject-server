'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'User Id is required'
         },
         notNull:{
            msg:'User Id is required'
         }
      }
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'Game Id is required'
         },
         notNull:{
            msg:'Game Id is required'
         }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'Name is required'
         },
         notNull:{
            msg:'Name is required'
         }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'Status is required'
         },
         notNull:{
            msg:'Status is required'
         }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'Genre is required'
         },
         notNull:{
            msg:'Genre is required'
         }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
         notEmpty: {
            msg: 'ImageUrl is required'
         },
         notNull:{
            msg:'ImageUrl is required'
         }
      }
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};