const { Destination, Pilot, Plane, Schedule } = require('../models')
const Login = require('./login')
const Register = require('./register')
const { bcrypt } = require('bcryptjs')


class Controller {

  static async out(req, res) {
    try {
      req.session.destroy()

      res.redirect('/login')
    } catch (error) {
      res.send(error)
    }
  }

  static showLandingPage(req, res) {
    try {
      const isLogin = req.session.UserId

      res.render('landing-page', {
        isLogin
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async pilot(req, res) {
    try {
      console.log(req.session)
      let data = await Pilot.findAll({
        include: Plane
      })

      let user = { email: req.session.email }


      res.render('pilot', { data, user })
    } catch (error) {
      res.send(error.message)
    }
  }
  static async planeDestination(req, res) {
    try {
      let data = await Plane.findAll({
        include: Destination
      })
      res.render('plandestination', { data })
    } catch (error) {
      res.send(error.message)
    }
  }

  static async showPilot(req, res) {
    try {
      let data = await Pilot.findAll()
      res.render('showPilot', { data })
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async showPlane(req, res) {
    try {
      let data = await Plane.findAll({
        include: Pilot
      })
      console.log(data);
      res.render('showPlane', { data })
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
}
module.exports = { Controller, Login, Register }