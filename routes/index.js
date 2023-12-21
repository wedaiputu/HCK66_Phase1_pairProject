const express = require('express')
const router = express.Router()
const { Controller } = require('../controllers/controller')
const AdminController = require('../controllers/login')
const session = require('express-session')
const destinationRouter = require('./destinationRouter')

router.use(session({
  secret: 'keyboard cat'
}))


const login = require('./login')
const register = require('./register')
const addRouter = require('./addRouter')

const isLogin = function (req, res, next) {
    if(req.session && req.session.UserId) {
      next()
    } else {
      res.redirect('/login')
    }
  }


router.get('/', Controller.pilot) 
router.get('/logout', Controller.out) 
router.use('/login', login)
router.use('/register', register)
router.get('/showPilot', Controller.showPilot)
router.get('/showPlane', Controller.showPlane)
router.use('/showDestination',destinationRouter )
router.use('/addFlight', addRouter)

router.use(isLogin)
module.exports = router

