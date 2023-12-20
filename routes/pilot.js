const express = require('express')
const pilot = express.Router()
const Controller = require('../controllers/controller')


pilot.get('/', Controller.pilot)
pilot.get('/home', Controller.planeDestination)
module.exports = pilot