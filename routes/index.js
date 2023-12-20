const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const pilot = require('./pilot')


router.get('/', Controller.pilot) 

router.use(pilot)

module.exports = router

