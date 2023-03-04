"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _require = require('../config/logger'),
    logger = _require.logger;

var _require2 = require('../model/department'),
    departmentDTO = _require2.departmentDTO,
    createdDepartmentDTO = _require2.createdDepartmentDTO;

var _require3 = require('../controller/utils'),
    BadRequestError = _require3.BadRequestError;

var _require4 = require('../config/constants'),
    user_role = _require4.user_role;

var _require5 = require('../sequelize'),
    sequelize = _require5.sequelize;

var models = require('../model');

var User = models.User,
    Department = models.Department;
module.exports = {
  getAllDepartments: function () {
    var _getAllDepartments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var allDepartments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Department.findAll();

            case 3:
              allDepartments = _context.sent;

              if (!(allDepartments.length === 0)) {
                _context.next = 8;
                break;
              }

              new BadRequestError("Departments not found!");
              _context.next = 9;
              break;

            case 8:
              return _context.abrupt("return", (0, _map["default"])(allDepartments).call(allDepartments, function (departmentInstance) {
                return departmentDTO(departmentInstance);
              }));

            case 9:
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              logger.error(_context.t0);
              throw _context.t0;

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    function getAllDepartments() {
      return _getAllDepartments.apply(this, arguments);
    }

    return getAllDepartments;
  }(),
  getDepartmentById: function () {
    var _getDepartmentById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var departmentInstance, resultDepartmentValues;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Department.findByPk(id);

            case 3:
              departmentInstance = _context2.sent;

              if (!departmentInstance) {
                _context2.next = 9;
                break;
              }

              resultDepartmentValues = departmentDTO(departmentInstance);
              return _context2.abrupt("return", resultDepartmentValues);

            case 9:
              throw new BadRequestError("Department with id - ".concat(id, ", nothing found!"));

            case 10:
              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              logger.error(_context2.t0);
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function getDepartmentById(_x) {
      return _getDepartmentById.apply(this, arguments);
    }

    return getDepartmentById;
  }(),
  getDepartmentByIdWithEmployees: function () {
    var _getDepartmentByIdWithEmployees = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
      var department;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Department.findByPk(id, {
                include: {
                  model: User,
                  as: 'user',
                  where: {
                    role: user_role.ROLE_EMPLOYEE
                  }
                }
              });

            case 3:
              department = _context3.sent;
              return _context3.abrupt("return", department);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              logger.error(_context3.t0);
              throw _context3.t0;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function getDepartmentByIdWithEmployees(_x2) {
      return _getDepartmentByIdWithEmployees.apply(this, arguments);
    }

    return getDepartmentByIdWithEmployees;
  }(),
  getDepartmentByIdWithUsers: function () {
    var _getDepartmentByIdWithUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
      var department;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Department.findByPk(id, {
                include: {
                  model: User,
                  as: 'user'
                }
              });

            case 3:
              department = _context4.sent;
              return _context4.abrupt("return", department);

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              logger.error(_context4.t0);
              throw _context4.t0;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function getDepartmentByIdWithUsers(_x3) {
      return _getDepartmentByIdWithUsers.apply(this, arguments);
    }

    return getDepartmentByIdWithUsers;
  }(),
  addDepartment: function () {
    var _addDepartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(values) {
      var name, result;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              name = values.name;
              _context5.next = 4;
              return Department.create({
                name: name
              });

            case 4:
              result = _context5.sent;
              return _context5.abrupt("return", createdDepartmentDTO(result));

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              logger.error('addDepartment service', _context5.t0);
              throw _context5.t0;

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 8]]);
    }));

    function addDepartment(_x4) {
      return _addDepartment.apply(this, arguments);
    }

    return addDepartment;
  }(),
  editDepartment: function () {
    var _editDepartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(departmentId, values) {
      var name;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              name = values.name;
              _context6.next = 4;
              return Department.update({
                name: name
              }, {
                where: {
                  id: departmentId
                }
              });

            case 4:
              _context6.next = 10;
              break;

            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              logger.error(_context6.t0);
              throw _context6.t0;

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 6]]);
    }));

    function editDepartment(_x5, _x6) {
      return _editDepartment.apply(this, arguments);
    }

    return editDepartment;
  }(),
  deleteDepartment: function () {
    var _deleteDepartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(departmentId) {
      var t;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return sequelize.transaction();

            case 3:
              t = _context7.sent;
              _context7.next = 6;
              return User.destroy({
                where: {
                  departmentid: departmentId
                }
              }, {
                transaction: t
              });

            case 6:
              _context7.next = 8;
              return Department.destroy({
                where: {
                  id: departmentId
                }
              }, {
                transaction: t
              });

            case 8:
              t.commit();
              _context7.next = 16;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              t.rollback();
              logger.error('deleteDepartment service', _context7.t0);
              throw _context7.t0;

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 11]]);
    }));

    function deleteDepartment(_x7) {
      return _deleteDepartment.apply(this, arguments);
    }

    return deleteDepartment;
  }(),
  isTheSameDepartmentNameExists: function isTheSameDepartmentNameExists(values) {
    try {
      var name = values.name;
      return Department.count({
        where: {
          name: name
        },
        distinct: true
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
};