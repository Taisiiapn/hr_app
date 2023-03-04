"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var apiRouter = require("./controller/api/api.router");

var authRouter = require("./controller/auth/auth.router");

var _require = require("./controller/utils"),
    NotFoundError = _require.NotFoundError,
    InternalError = _require.InternalError;

var cors = require('cors');

var _require2 = require("./sequelize"),
    checkDBConnection = _require2.checkDBConnection;

var errorHandler = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  var error = err.status ? err : new InternalError();
  res.status(error.status).send(error.message);
};

app.use(cors({
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  next();
});
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use(errorHandler);
app.use('*', function (err, req, res, next) {
  next(new NotFoundError());
});
checkDBConnection().then(function () {
  console.log('DB connection check finished');
});
var port = process.env.SERVER_PORT || 3000;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});