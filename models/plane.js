'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Plane.belongsTo(models.Pilot)
      Plane.belongsTo(models.Pilot, { foreignKey: 'PilotId' });
      Plane.hasMany(models.Schedule, { foreignKey: 'planeId' });
      Plane.belongsToMany(models.Destination, { through: models.FlightAssignment, foreignKey: 'PlaneId' });
    }
  }
  Plane.init({
    name: DataTypes.STRING,
    condition: DataTypes.STRING,
    capacity: DataTypes.STRING,
    PilotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plane',
  });
  return Plane;
};