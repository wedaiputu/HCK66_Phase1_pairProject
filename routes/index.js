const express = require('express')
const router = express.Router()
const { Controller } = require('../controllers/controller')
const AdminController = require('../controllers/login')
const session = require('express-session')

router.use(session({
  secret: 'keyboard cat'
}))


const login = require('./login')
const register = require('./register')

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
// router.use('/register', register)
// router.use("/pilot",pilot)

router.use(isLogin)
module.exports = router

