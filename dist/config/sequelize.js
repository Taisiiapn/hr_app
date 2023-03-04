"use strict";

var environment = require('./environment');

require('dotenv').config();

var _environment$db = environment.db,
    host = _environment$db.host,
    user = _environment$db.user,
    password = _environment$db.password,
    database = _environment$db.database;
var postgres = {
  options: {
    host: host,
    database: database,
    username: user,
    password: password,
    dialect: 'postgres',
    logging: false
  }
};
module.exports = postgres;