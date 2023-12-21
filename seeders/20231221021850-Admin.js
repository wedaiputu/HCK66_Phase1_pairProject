'use strict';
const fs = require("fs");
const { hashPass } = require("../helpers/brcypt");
// const { hashPass } = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(fs.readFileSync('./data/admin.json', 'utf-8')).map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    el.password = hashPass(el.password)
    return el
   })
   await queryInterface.bulkInsert('Admins', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
