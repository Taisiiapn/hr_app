"use strict";

var _require = require('winston'),
    createLogger = _require.createLogger,
    transports = _require.transports,
    format = _require.format;

var _require2 = require('pg'),
    Pool = _require2.Pool;

var environment = require('./environment');

var _require3 = require('winston-transport-pg'),
    PostgresTransport = _require3.PostgresTransport;

var _environment$db = environment.db,
    host = _environment$db.host,
    user = _environment$db.user,
    password = _environment$db.password,
    database = _environment$db.database;
var pool = new Pool({
  user: user,
  password: password,
  host: host,
  database: database
});
var opts = {
  level: 'error',
  tableName: 'logs',
  format: format.combine(format.timestamp(), format.json())
};
var postgresTransport = new PostgresTransport(pool, opts);
var errorNames = {
  common: {
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
  },
  department: {
    DEPARTMENTS_RENDER: 'DEPARTMENTS_RENDER',
    DEPARTMENT_CREATE_RENDER: 'DEPARTMENT_CREATE_RENDER',
    DEPARTMENT_UPDATE_RENDER: 'DEPARTMENT_UPDATE_RENDER',
    DEPARTMENT_CREATE_ACTION: 'DEPARTMENT_CREATE_ACTION',
    DEPARTMENT_UPDATE_ACTION: 'DEPARTMENT_UPDATE_ACTION',
    DEPARTMENT_DELETE_ACTION: 'DEPARTMENT_DELETE_ACTION'
  },
  employee: {
    EMPLOYEES_RENDER: 'EMPLOYEES_RENDER',
    EMPLOYEE_CREATE_RENDER: 'EMPLOYEE_CREATE_RENDER',
    EMPLOYEE_UPDATE_RENDER: 'EMPLOYEE_UPDATE_RENDER',
    EMPLOYEE_CREATE_ACTION: 'EMPLOYEE_CREATE_ACTION',
    EMPLOYEE_UPDATE_ACTION: 'EMPLOYEE_UPDATE_ACTION',
    EMPLOYEE_DELETE_ACTION: 'EMPLOYEE_DELETE_ACTION'
  },
  login: {
    LOGIN_RENDER: 'LOGIN_RENDER',
    LOGIN_ACTION: 'LOGIN_ACTION',
    LOG_OUT: 'LOG_OUT'
  }
};
var logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  level: 'info',
  transports: [new transports.File({
    filename: 'info.log'
  }), postgresTransport, new transports.Console()]
});
module.exports = {
  logger: logger,
  errorNames: errorNames
};