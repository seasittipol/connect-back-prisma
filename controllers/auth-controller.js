const bcrypt = require('bcrypt')
const db = require('../models/db')

// module.exports.register == exports.register จะ path module ให้
exports.register = async (req, res, next) => {
    const { s_code, password, confirmPassword, firstname, email } = req.body
    // validation : joi
    try {
        if (!(s_code && password && confirmPassword && firstname)) {
            return next(new Error("fullfill blank input::400"))
        }
        if (password !== confirmPassword) {
            throw new Error("check confirm password::401")
        }
        const { confirmPassword: cfpw, ...data } = req.body
        console.log(data)

        res.json(req.body)
    } catch (err) {
        next(err)
    }
}