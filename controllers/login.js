const { User } = require('../models/index')
const bcrypt = require('bcrypt')
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
      let input = req.body
      const account = await User.findOne({
        attributes: [
          "id",
          "email",
          "role",
          "password",
        ],
        where: {
          email: input.email
        }
      })

    

      if(account) {
        const isValidPassword = bcrypt.compareSync(input.password, account.password)
        if(isValidPassword) {
          

        req.session.UserId = account.id
        req.session.role = account.role
        req.session.email = req.body.email
        

        res.redirect('/')
        }
      }else{
        throw new Error('Invalid password or username.')
      }
      

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