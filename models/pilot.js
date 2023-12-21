'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pilot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pilot.hasOne(models.Plane)
    }
  }
  Pilot.init({
    pilotName: DataTypes.STRING,
    licenseNumber: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    experience: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pilot',
  });
  return Pilot;
};