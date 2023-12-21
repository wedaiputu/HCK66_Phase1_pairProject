const express = require('express')
const router = express.Router()
const AddController  = require('../controllers/addController')



router.get('/', AddController.addFlight)
router.post('/', AddController.addFlightPost)

module.exports = router