const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Schedule = sequelize.define('Schedule', {
    arrival_time: DataTypes.DATE,
    departure_time: DataTypes.DATE,
  });

  return Schedule;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plane = sequelize.define('Plane', {
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    condition: DataTypes.STRING,
  });

  Plane.belongsTo(Pilot, { foreignKey: 'pilot_id' });
  Plane.hasMany(Schedule, { foreignKey: 'plane_id' });

  return Plane;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Destination = sequelize.define('Destination', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    airport_code: DataTypes.STRING,
  });

  // Add the association
  Destination.hasMany(Schedule, { foreignKey: 'destination_id' });

  return Destination;
};

// In your main file where you set up Sequelize, make sure to establish the associations:
const Plane = require('./models/plane');
const Destination = require('./models/destination');
const Schedule = require('./models/schedule');

// This establishes the association between Schedule, Plane, and Destination
Schedule.belongsTo(Plane, { foreignKey: 'plane_id' });
Schedule.belongsTo(Destination, { foreignKey: 'destination_id' });
Plane.hasMany(Schedule, { foreignKey: 'plane_id' });
Destination.hasMany(Schedule, { foreignKey: 'destination_id' });



<!-- geoJSON -->

The Coordinate values are now consistent and follow the GeoJSON format. I used numerical coordinates in the correct order (longitude, latitude).
Each entry has a unique id.
The Coordinate property is now an object with type set to "Point" and coordinates containing an array of numerical values.

npx sequelize-cli model:generate --name Plane --attributes name:string,condition:string,capacity:string,pilotId:integer

npx sequelize-cli model:generate --name Pilot --attributes name:string,licenseNumber:string,experience:integer,experience:integer

npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string

npx sequelize-cli model:generate --name UserProfile --attributes usern:string,image:string,UserId:Integer

npx sequelize-cli model:generate --name Destination --attributes name:string,country:string,coordinate:float,airportCode:integer

npx sequelize-cli model:generate --name Schedule --attributes arrivalTime:integer,departureTime:integer,planeId:integer,destinationId:integer

npx sequelize-cli model:generate --name FlightAssignment --attributes PlaneId:integer,DestinationId:integer



- JSON pake id atau tidak. x
- type data Point 
- M : M yang di tampilkan conjuntion / main table ?
- proses seeding migrasi// untuk foreign key apakah di migrasi ?? V


npx sequelize-cli seed:generate --name Pilot;npx sequelize-cli seed:generate --name Plane;npx sequelize-cli seed:generate --name Destianation;npx sequelize-cli seed:generate --name Schedule

npx sequelize-cli seed:generate --name Plane
npx sequelize-cli seed:generate --name Destianation
npx sequelize-cli seed:generate --name Schedule

npx sequelize-cli seed:generate --name User

npx sequelize db:migrate
npx sequelize db:seed:all


static associate(models) {
      // define association here
      Shcedule.belongsTo(Destination, {foreignKey : 'destinationId'})
      Shcedule.belongsTo(Plane, {foreignKey : 'planeId'})
    }



    'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync('./data/schedule.json', 'utf-8')).map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Shcedules', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Shcedules', null, {});
  }
};
