'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      Destination.hasMany(models.Schedule, {foreignKey : 'destinationId'})
      Destination.belongsToMany(models.Plane, { through: models.FlightAssignment, foreignKey: 'DestinationId' });
    }
  }
  Destination.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    coordinate: DataTypes.STRING,
    airportCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};