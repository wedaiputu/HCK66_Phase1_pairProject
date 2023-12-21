const { Destination, Pilot, Plane, Schedule } = require('../models')
const Login = require('./login')
const Register = require('./register')
const bcrypt = require('bcrypt')

class AddController{
    static async addFlight(req, res){
        try {
            
          let data = await Plane.findAll()
          let dataDestination = await Destination.findAll()  
          res.render('addFlight', {data, dataDestination})
        } catch (error) {
          res.send(error)
        }
      }
      static async addFlightPost(req, res){
        try {
          console.log('asddasads');
          const {planeId, destinationId} = req.body
          
          console.log(planeId, destinationId);
          res.redirect('/')
        } catch (error) {
          res.send(error)
        }
      }
}
module.exports = AddController