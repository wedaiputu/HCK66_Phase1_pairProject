const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const pilot = require('./pilot')
const admin = require('./admin')


router.get('/', Controller.pilot) 

router.use(pilot)
router.use(admin)

module.exports = router

