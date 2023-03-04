"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/values"));

var _context, _context2;

var _require = require("sequelize"),
    Sequelize = _require.Sequelize;

var _require2 = require("../sequelize"),
    sequelize = _require2.sequelize;

var builders = (0, _map["default"])(_context = [require('./logs'), require('./department'), require('./user')]).call(_context, function (module) {
  return module.builder;
});
var models = {};
(0, _forEach["default"])(builders).call(builders, function (builder) {
  var model = builder(Sequelize, sequelize);
  models[model.name] = model;
});
(0, _forEach["default"])(_context2 = (0, _values["default"])(models)).call(_context2, function (model) {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports = models;