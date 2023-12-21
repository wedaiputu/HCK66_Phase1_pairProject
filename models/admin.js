'use strict';
const { hashPass } = require('../helpers/brcypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
      
    }
  }
  Admin.init({
    adminName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required!"
        },
        notNull: {
          args: true,
          msg: "Password is required!"
        },
        isMinLength(value) {
          if (value.length < 5) throw new Error("Minimum password length is 5")
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
Admin.beforeCreate((instance, options) => {
  instance.password = hashPass(instance.password);
})
  return Admin;
};