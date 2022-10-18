const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRouter = require("./controller/api/api.router");
const authRouter = require("./controller/auth/auth.router");
const {NotFoundError, InternalError} = require("./controller/utils");
const cors = require('cors')
const {checkDBConnection} = require("./sequelize");

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


checkDBConnection().then(() => {
  console.log('DB connection check finished')
});


//app.get('*', (req, res) => todo client's bundled index.html)

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))