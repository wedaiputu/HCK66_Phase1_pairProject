'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Planes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planeName: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.STRING
      },
      PilotId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName : 'Pilots',
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Planes');
  }
};