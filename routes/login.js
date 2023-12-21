const express = require('express')
const router = express.Router()
const { Login } = require('../controllers/controller')

const isLogin = function(req, res, next) {
  if(req.session && req.session.UserId) {
    res.redirect('/')
  } else {
    next()
  }
}

router.use(isLogin)

router.get('/', Login.show)
router.post('/', Login.login)

module.exports = router