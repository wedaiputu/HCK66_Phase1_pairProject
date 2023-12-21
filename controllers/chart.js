const { Destination } = require('../models')
const {Op} =require('sequelize')

class ChartController{
    static async chart(req, res){
        try {
            let data = await Destination.findAll({
                attributes : ['destiantionName']
            })
            res.render('chart', {data})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = ChartController