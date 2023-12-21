const {Admin} = require('../models')

const { comparePass } = require('../helpers/brcypt');


class AdminController {
        static async register(req, res) {
            try {
                const admins = await Admin.create(req.body);
                res.render('register',{admins})
                
            } catch (error) {
                throw error
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "InvalidInput", field: "email" };
            if (!password) throw { name: "InvalidInput", field: "password" };

            const data = await Admin.findOne({
                where: {
                    email: email,
                }
            })
            if (!data) throw { name: "Unauthenticated" };
            if (!comparePass(password, data.password)) throw { name: "Unauthenticated" }; 
            // return data;
            res.render('login', {data})
        } catch (error) {
            throw error
        }
    }
}

module.exports = AdminController