require('dotenv').config()
// console.log(process.env);
const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const errorMiddleware = require('./middleware/error')
const authRoute = require('./routes/auth-route')

const app = express()

// REST api server
app.use(cors())
app.use(express.json())

// service api
app.use('/auth', authRoute)

app.use(notFound)
app.use(errorMiddleware)

let port = process.env.PORT
app.listen(port, () => console.log('server running on port', port))