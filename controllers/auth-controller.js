const bcrypt = require('bcrypt')
const db = require('../models/db')
const jwt = require('jsonwebtoken')

// const tryCatch = func => (req, res, next) => func(req, res, next).catch(err => next(err))
const tryCatch = func => (req, res, next) => func(req, res, next).catch(next)

// module.exports.register == exports.register จะ path module ให้
exports.register = tryCatch(async (req, res, next) => {
    const { s_code, password, confirmPassword, firstname, email } = req.body
    // validation : joi
    if (!(s_code && password && confirmPassword && firstname)) {
        return next(new Error("fullfill blank input::400"))
    }
    if (password !== confirmPassword) {
        throw new Error("check confirm password::401")
    }
    const { confirmPassword: cfpw, ...data } = req.body
    data.password = await bcrypt.hash(data.password, 10)
    console.log(data)
    // const newStudent = await db.student.create({ data: data })
    const newStudent = await db.student.create({ data })
    console.log(newStudent)
    res.json({ msg: 'Register Success' })
})

exports.login = tryCatch(async (req, res, next) => {
    const { t_code, s_code, password } = req.body
    console.log(req.body)
    if (s_code && t_code) {
        throw new Error('Teacher or Student::400')
    }

    const result = t_code
        ? await db.teacher.findFirstOrThrow({ where: { t_code: t_code } })
        : await db.student.findFirstOrThrow({ where: { s_code: s_code } })

    let pwOk = await bcrypt.compare(password, result.password)
    if (!pwOk) {
        throw new Error('Invalid login::400')
    }

    const payLoad = t_code
        ? { id: result.id, t_code: result.t_code, }
        : { id: result.id, s_code: result.s_code }

    const token = jwt.sign(payLoad, process.env.JWTSECRET, { expiresIn: '30d' })

    res.json({ ...payLoad, token })
})