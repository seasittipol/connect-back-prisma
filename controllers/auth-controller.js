const db = require('../models/db')

// module.exports.register == exports.register จะ path module ให้
exports.register = async (req, res, next) => {
    const { s_code, password, confirmPassword, firstname, email } = req.body
    // validation : joi
    try {
        if (!(s_code && password && confirmPassword && firstname && email)) {
            return next(new Error("fullfill blank input::400"))
        }
        res.json(req.body)
    } catch (err) {
        next(err)
    }
}