"use strict";

var EventEmitter = require('events');

var myEmitter = new EventEmitter();

var _require = require('../sequelize'),
    sequelize = _require.sequelize;

var models = require('../model');

var Logs = models.Logs;
var events = {
  DEPARTMENT_VALIDATION_FAIL: 'DEPARTMENT_VALIDATION_FAIL',
  USER_VALIDATION_FAIL: 'USER_VALIDATION_FAIL',
  AUTH_VALIDATION_FAIL: 'AUTH_VALIDATION_FAIL'
};
myEmitter.on(events.AUTH_VALIDATION_FAIL, function (error) {
  sequelize.query("INSERT INTO logs(level, message) VALUES ('info', '".concat(error, "');"), {
    model: Logs
  });
});
myEmitter.on(events.DEPARTMENT_VALIDATION_FAIL, function (error) {
  sequelize.query("INSERT INTO logs(level, message) VALUES ('info', '".concat(error, "');"), {
    model: Logs
  });
});
myEmitter.on(events.USER_VALIDATION_FAIL, function (error) {
  sequelize.query("INSERT INTO logs(level, message) VALUES ('info', '".concat(error, "');"), {
    model: Logs
  });
});
module.exports = {
  emitAuthFailedValidation: function emitAuthFailedValidation(error) {
    myEmitter.emit(events.AUTH_VALIDATION_FAIL, error);
  },
  emitDepartmentFailedValidation: function emitDepartmentFailedValidation(error) {
    myEmitter.emit(events.DEPARTMENT_VALIDATION_FAIL, error);
  },
  emitUserFailedValidation: function emitUserFailedValidation(error) {
    myEmitter.emit(events.USER_VALIDATION_FAIL, error);
  }
};