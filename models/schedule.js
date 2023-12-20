'use strict';
const {
  Model
} = require('sequelize');
const destination = require('./destination');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Plane, { foreignKey: 'planeId' });
      Schedule.belongsTo(models.Destination, { foreignKey: 'destinationId' });
    }
  }
  Schedule.init({
    arrivalTime: DataTypes.INTEGER,
    departureTime: DataTypes.INTEGER,
    planeId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};