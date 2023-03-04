"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/freeze"));

var dotenv = require('dotenv');

dotenv.config();
module.exports = (0, _freeze["default"])({
  port: process.env.SERVER_PORT,
  host: process.env.HOST,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});