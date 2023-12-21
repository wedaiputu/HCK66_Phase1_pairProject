const {Destination, Pilot, Plane, Schedule} = require('../models')

class Controller {
    static async pilot(req, res){
        try {
            let data = await Pilot.findAll({
                    include : Plane
            })
            res.render('pilot', {data})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async planeDestination(req,res){
        try {
            let data = await Plane.findAll({
                include : Destination
            })
            console.log(data);
            res.render('plandestination', {data})
        } catch (error) {
            res.send(error.message)
        }
    }
}
module.exports = Controller