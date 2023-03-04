"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var _require2 = require('./utils'),
    parseOptionalValueToColumnRecord = _require2.parseOptionalValueToColumnRecord;

var _require3 = require('../model/user'),
    userAuthTokenDTO = _require3.userAuthTokenDTO,
    userDTO = _require3.userDTO,
    userFullDTO = _require3.userFullDTO,
    createdUserDTO = _require3.createdUserDTO;

var _require4 = require('../config/logger'),
    logger = _require4.logger;

var _require5 = require('../controller/utils'),
    BadRequestError = _require5.BadRequestError,
    ValidationError = _require5.ValidationError,
    singleErrorToErrorObjDTO = _require5.singleErrorToErrorObjDTO;

var models = require('../model');

var _require6 = require("../config/constants"),
    user_role = _require6.user_role;

var User = models.User;
var ROLE_ADMIN = user_role.ROLE_ADMIN,
    ROLE_EMPLOYEE = user_role.ROLE_EMPLOYEE;
module.exports = {
  getUserByEmailAuth: function () {
    var _getUserByEmailAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
      var userInstance, errorObjJSON, resultUserValues;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return User.findOne({
                where: {
                  email: email
                }
              });

            case 3:
              userInstance = _context.sent;

              if (userInstance) {
                _context.next = 9;
                break;
              }

              errorObjJSON = (0, _stringify["default"])(singleErrorToErrorObjDTO('email', "".concat(email, " not found!")));
              throw new ValidationError(errorObjJSON);

            case 9:
              resultUserValues = userAuthTokenDTO(userInstance);
              return _context.abrupt("return", resultUserValues);

            case 11:
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              logger.error('getUserByEmailAuth service', _context.t0);
              throw _context.t0;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));

    function getUserByEmailAuth(_x) {
      return _getUserByEmailAuth.apply(this, arguments);
    }

    return getUserByEmailAuth;
  }(),
  getAuthUserById: function () {
    var _getAuthUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var userInstance, resultUserValues;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return User.findOne({
                where: {
                  id: id
                }
              });

            case 3:
              userInstance = _context2.sent;

              if (userInstance) {
                _context2.next = 8;
                break;
              }

              throw new BadRequestError('User not found!');

            case 8:
              resultUserValues = userAuthTokenDTO(userInstance);
              return _context2.abrupt("return", resultUserValues);

            case 10:
              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              logger.error('getUserById service', _context2.t0);
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function getAuthUserById(_x2) {
      return _getAuthUserById.apply(this, arguments);
    }

    return getAuthUserById;
  }(),
  getUserById: function () {
    var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
      var userInstance, resultUserValues;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return User.findOne({
                where: {
                  id: id
                }
              });

            case 3:
              userInstance = _context3.sent;

              if (userInstance) {
                _context3.next = 8;
                break;
              }

              throw new BadRequestError('User not found!');

            case 8:
              resultUserValues = userFullDTO(userInstance);
              return _context3.abrupt("return", resultUserValues);

            case 10:
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              logger.error('getUserById service', _context3.t0);
              throw _context3.t0;

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }));

    function getUserById(_x3) {
      return _getUserById.apply(this, arguments);
    }

    return getUserById;
  }(),
  getUsers: function () {
    var _getUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(value) {
      var role, departmentId, users;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              role = value.role, departmentId = value.departmentId;
              users = [];
              _context4.prev = 2;

              if (!(role === ROLE_ADMIN)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 6;
              return User.findAll({
                where: {
                  role: ROLE_ADMIN
                }
              });

            case 6:
              users = _context4.sent;
              _context4.next = 25;
              break;

            case 9:
              if (!(role === ROLE_EMPLOYEE && departmentId)) {
                _context4.next = 15;
                break;
              }

              _context4.next = 12;
              return User.findAll({
                where: {
                  role: ROLE_EMPLOYEE,
                  departmentid: departmentId
                }
              });

            case 12:
              users = _context4.sent;
              _context4.next = 25;
              break;

            case 15:
              if (!(role === ROLE_EMPLOYEE && !departmentId)) {
                _context4.next = 21;
                break;
              }

              _context4.next = 18;
              return User.findAll({
                where: {
                  role: ROLE_EMPLOYEE
                }
              });

            case 18:
              users = _context4.sent;
              _context4.next = 25;
              break;

            case 21:
              if (!(!role && !departmentId)) {
                _context4.next = 25;
                break;
              }

              _context4.next = 24;
              return User.findAll();

            case 24:
              users = _context4.sent;

            case 25:
              return _context4.abrupt("return", (0, _map["default"])(users).call(users, function (userInstance) {
                return userDTO(userInstance);
              }));

            case 28:
              _context4.prev = 28;
              _context4.t0 = _context4["catch"](2);
              logger.error('getUserWithViewValues service', _context4.t0);
              throw _context4.t0;

            case 32:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 28]]);
    }));

    function getUsers(_x4) {
      return _getUsers.apply(this, arguments);
    }

    return getUsers;
  }(),
  getUsersByDepartmentId: function () {
    var _getUsersByDepartmentId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
      var userInstance, resultUserValues;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _find["default"])(User).call(User, {
                where: {
                  id: id
                }
              });

            case 3:
              userInstance = _context5.sent;

              if (userInstance) {
                _context5.next = 8;
                break;
              }

              throw new BadRequestError("Employee with id - ".concat(id, ", nothing found!"));

            case 8:
              resultUserValues = userDTO(userInstance);
              return _context5.abrupt("return", resultUserValues);

            case 10:
              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              logger.error('getUserById service', _context5.t0);
              throw _context5.t0;

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }));

    function getUsersByDepartmentId(_x5) {
      return _getUsersByDepartmentId.apply(this, arguments);
    }

    return getUsersByDepartmentId;
  }(),
  addUser: function () {
    var _addUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(values) {
      var firstName, lastName, salary, birthday, email, role, departmentid, salaryParsed, birthdayParsed, result;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              firstName = values.firstName, lastName = values.lastName, salary = values.salary, birthday = values.birthday, email = values.email, role = values.role, departmentid = values.departmentid;
              salaryParsed = parseOptionalValueToColumnRecord(salary);
              birthdayParsed = parseOptionalValueToColumnRecord(birthday);
              _context6.next = 6;
              return User.create({
                firstName: firstName,
                lastName: lastName,
                salary: salaryParsed,
                departmentid: departmentid,
                birthday: birthdayParsed,
                email: email,
                role: role
              });

            case 6:
              result = _context6.sent;
              return _context6.abrupt("return", createdUserDTO(result));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              logger.error('addUser service', _context6.t0);
              throw _context6.t0;

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 10]]);
    }));

    function addUser(_x6) {
      return _addUser.apply(this, arguments);
    }

    return addUser;
  }(),
  editUser: function () {
    var _editUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id, values) {
      var firstName, lastName, salary, birthday, email, departmentid, salaryParsed, birthdayParsed, resultObj;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              firstName = values.firstName, lastName = values.lastName, salary = values.salary, birthday = values.birthday, email = values.email, departmentid = values.departmentid;
              salaryParsed = parseOptionalValueToColumnRecord(salary);
              birthdayParsed = parseOptionalValueToColumnRecord(birthday);
              resultObj = (0, _assign["default"])(values, {
                salary: salaryParsed ? salaryParsed : undefined,
                birthday: birthday ? birthday : undefined
              });
              _context7.next = 7;
              return User.update({
                firstName: firstName,
                lastName: lastName,
                salary: salaryParsed,
                birthday: birthdayParsed,
                email: email,
                departmentid: departmentid
              }, {
                where: {
                  id: id
                }
              });

            case 7:
              _context7.next = 13;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              logger.error('editUser service', _context7.t0);
              throw _context7.t0;

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 9]]);
    }));

    function editUser(_x7, _x8) {
      return _editUser.apply(this, arguments);
    }

    return editUser;
  }(),
  deleteEmployee: function () {
    var _deleteEmployee = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(userId) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return User.destroy({
                where: {
                  role: ROLE_EMPLOYEE,
                  id: userId
                }
              });

            case 3:
              _context8.next = 9;
              break;

            case 5:
              _context8.prev = 5;
              _context8.t0 = _context8["catch"](0);
              logger.error('deleteUser service', _context8.t0);
              throw _context8.t0;

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 5]]);
    }));

    function deleteEmployee(_x9) {
      return _deleteEmployee.apply(this, arguments);
    }

    return deleteEmployee;
  }(),
  isTheSameEmailExists: function isTheSameEmailExists(values) {
    try {
      var email = values.email;
      return User.count({
        where: {
          email: email
        },
        distinct: true
      });
    } catch (error) {
      logger.error('isTheSameEmailExists service', error);
      throw error;
    }
  },
  isTheSameEmailExistsWithDifferentId: function isTheSameEmailExistsWithDifferentId(userId, values) {
    try {
      var email = values.email;
      return User.count({
        where: {
          email: email,
          role: ROLE_EMPLOYEE,
          id: (0, _defineProperty2["default"])({}, Sequelize.Op.not, userId)
        },
        distinct: true
      });
    } catch (error) {
      logger.error('isTheSameEmailExistsWithDifferentId', error);
      throw error;
    }
  }
};