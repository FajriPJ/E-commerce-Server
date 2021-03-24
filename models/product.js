'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "image_url is required"
        },
        // isUrl: {
        //   args: true, 
        //   msg: "invalid image url format"
        // }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          args: true,
          msg: "price is required"
        },
        isInt: {
          args: true,
          msg: 'input must be number'
        },
        min: {
          args: [0],
          msg: "the price cannot be a minus"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          args: true,
          msg: "stock is required"
        },
        isInt: {
          args: true,
          msg: 'input must be number'
        },
        min: {
          args: [0],
          msg: "the stock cannot be a minus"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};