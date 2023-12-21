const { User } = require('../models/index')

class Login {
  static show(req, res) {
    try {
      const error = req.query.error


      res.render('login-page', {
        error,
    
      })
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async login(req, res) {
    try {
      const user = await User.login(req.body)
      req.session.UserId = user
      req.session.email = req.body.email

      res.redirect('/')
    } catch (error) {
      res.redirect(`/login?error=${error.message}`)
    }
  }

  static async out(req, res) {
    try {
      req.session.UserId.destroy()
      
      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Login