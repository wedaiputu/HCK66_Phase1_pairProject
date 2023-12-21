const express = require('express')
const admin = express.Router()
const Controller = require('../controllers/controller')
const AdminController = require('../controllers/login')

admin.use('/login', AdminController.login)

module.exports = admin