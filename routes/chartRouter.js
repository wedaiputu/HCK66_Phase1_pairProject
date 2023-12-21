const ChartController = require('../controllers/chart')
const express = require('express')
const router = express.Router()

router.get('/', ChartController.chart)

module.exports = router
