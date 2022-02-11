"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var logger = require('./config/logger');

var departmentsRouter = require('./controller/departments/department.router');

var commonController = require('./controller/common');

var employeesRouter = require('./controller/employees/employees.router');

var _require = require('sequelize/dist'),
    Sequelize = _require.Sequelize;

var postgres = require('./config/sequelize');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.get('/', commonController.rootRouteRedirect);
app.get('/departments', function (req, res) {
  return departmentsRouter.departmentsRootRoute(req, res);
});
app.get('/departments/create', function (req, res) {
  return departmentsRouter.addDepartmentRoute(req, res);
});
app.get('/departments/:departmentId', function (req, res) {
  return employeesRouter.employeesRoute(req, res);
});
app.get('/departments/:departmentId/update', function (req, res) {
  return departmentsRouter.editDepartmentRoute(req, res);
});
app.get('/departments/:departmentId/employees/create', function (req, res) {
  return employeesRouter.addEmployeeRoute(req, res);
});
app.get('/departments/:departmentId/employees/:employeeId/update', function (req, res) {
  return employeesRouter.editEmployeeRoute(req, res);
});
app.post('/departments/create', function (req, res) {
  return departmentsRouter.addDepartmentAction(req, res);
});
app.post('/departments/:departmentId/delete', function (req, res) {
  return departmentsRouter.deleteDepartmentAction(req, res);
});
app.post('/departments/:departmentId/update', function (req, res) {
  return departmentsRouter.editDepartmentAction(req, res);
});
app.post('/departments/:departmentId/employees/create', function (req, res) {
  return employeesRouter.addEmployeeAction(req, res);
});
app.post('/departments/:departmentId/employees/:employeeId/update', function (req, res) {
  return employeesRouter.editEmployeeAction(req, res);
});
app.post('/departments/:departmentId/employees/:employeeId/delete', function (req, res) {
  return employeesRouter.deleteEmployeeAction(req, res);
});
app.use('*', function (req, res) {
  return commonController.routeNotFound(req, res);
});

function connectToDB() {
  return _connectToDB.apply(this, arguments);
}

function _connectToDB() {
  _connectToDB = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var sequelize;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sequelize = new Sequelize(postgres.options);
            _context.prev = 1;
            _context.next = 4;
            return sequelize.authenticate();

          case 4:
            logger.info('Соединение с БД было успешно установлено');
            return _context.abrupt("return", sequelize);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            logger.error('Невозможно выполнить подключение к БД: ', _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _connectToDB.apply(this, arguments);
}

var postgresClient = connectToDB();
postgres.client = postgresClient;
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return logger.info("Listening on port ".concat(port, "..."));
});