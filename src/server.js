const express = require('express')
const app = express()
const sequelize = require('./syncDB')
const User = require('./model/user')
const Department = require('./model/department')
const Logs = require('./model/logs')
const postgres = require('./config/sequelize')
const bodyParser = require('body-parser')
const { logger } = require('./config/logger')
const apiRouter = require("./controller/api/api.router");
const authRouter = require("./controller/auth/auth.router");
const {NotFoundError, InternalError} = require("./controller/utils");
const cors = require('cors')

const errorHandler = (err, req, res, next) => {
    
    if (res.headersSent) {
        return next(err)
    }

    const error = err.status ? err : new InternalError()

    res
        .status(error.status)
        .send(error.message)
}


app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    next()
  })
app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use(errorHandler)
app.use('*', (err, req, res, next) => {
    next(new NotFoundError())
})


const postgresClient = connectToDB()
postgres.client = postgresClient


//app.get('*', (req, res) => todo client's bundled index.html)

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))