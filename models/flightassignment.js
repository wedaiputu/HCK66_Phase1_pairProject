'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FlightAssignment.belongsTo(models.Plane, { foreignKey: 'PlaneId' });
      FlightAssignment.belongsTo(models.Destination, { foreignKey: 'DestinationId' });
    
    }
  }
  FlightAssignment.init({
    PlaneId: DataTypes.INTEGER,
    DestinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FlightAssignment',
  });
  return FlightAssignment;
};