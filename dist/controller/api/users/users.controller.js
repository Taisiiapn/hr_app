"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _require = require('../../../config/logger'),
    logger = _require.logger;

var usersService = require('../../../services/user.service');

var _require2 = require('../../../services/eventEmitter.service'),
    emitUserFailedValidation = _require2.emitUserFailedValidation;

var _require3 = require('../../utils'),
    dateStrRegExp = _require3.dateStrRegExp,
    ageRequirementCheck = _require3.ageRequirementCheck,
    validDateCheck = _require3.validDateCheck,
    ValidationError = _require3.ValidationError,
    joiErrorDetailsToErrorObjDTO = _require3.joiErrorDetailsToErrorObjDTO,
    singleErrorToErrorObjDTO = _require3.singleErrorToErrorObjDTO;

var _require4 = require('../../../config/constants'),
    user_role = _require4.user_role;

var ROLE_ADMIN = user_role.ROLE_ADMIN,
    ROLE_EMPLOYEE = user_role.ROLE_EMPLOYEE;

var Joi = require('joi');

var jwtDecode = require("jwt-decode");

var addUserSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  salary: Joi.number(),
  birthday: Joi.string().pattern(new RegExp(dateStrRegExp), 'yyyy.mm.dd').custom(validDateCheck).message('Invalid date').custom(ageRequirementCheck).message('Age required to be 18 - 75 years range').required(),
  email: Joi.string().email({
    tlds: {
      allow: false
    }
  }).required(),
  role: Joi.string().messages({
    'any.only': 'The role should be selected'
  }).required()
});
var editUserSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(20),
  lastName: Joi.string().alphanum().min(3).max(20),
  salary: Joi.number(),
  birthday: Joi.string().pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy').custom(validDateCheck, 'Valid date check').message('Invalid date').custom(ageRequirementCheck, 'Age requirement').message('Age required to be 18 - 75 years range'),
  email: Joi.string().email({
    tlds: {
      allow: false
    }
  }),
  departmentid: Joi.string().uuid()
}).unknown();
var querySchema = Joi.object({
  role: Joi.string(),
  departmentId: Joi.string()
});

var getUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var query, _querySchema$validate, value, error, users;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            query = req.query;
            _querySchema$validate = querySchema.validate(query), value = _querySchema$validate.value, error = _querySchema$validate.error;

            if (!error) {
              _context.next = 6;
              break;
            }

            _context.next = 10;
            break;

          case 6:
            _context.next = 8;
            return usersService.getUsers(value);

          case 8:
            users = _context.sent;
            res.json(users);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var token, userid, user, departmentid, decoded;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.headers.token;
            userid = req.params.userid;
            _context2.next = 5;
            return usersService.getUserById(userid);

          case 5:
            user = _context2.sent;
            departmentid = user.departmentid;
            decoded = jwtDecode(token);

            if (decoded.role === ROLE_ADMIN) {
              res.json({
                user: user
              });
            }

            if (decoded.role === ROLE_EMPLOYEE) {
              decoded.departmentid === departmentid ? res.send(user) : res.sendStatus(401);
            }

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function getUserById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var body, _addUserSchema$valida, value, error, errorObjJSON, result, _errorObjJSON, _yield$usersService$a, id, user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            body = req.body;
            _addUserSchema$valida = addUserSchema.validate(body), value = _addUserSchema$valida.value, error = _addUserSchema$valida.error;

            if (!error) {
              _context3.next = 10;
              break;
            }

            errorObjJSON = (0, _stringify["default"])(joiErrorDetailsToErrorObjDTO(error.details));
            logger.info('createUserFailedValidation', errorObjJSON);
            emitUserFailedValidation(errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 10:
            _context3.next = 12;
            return usersService.isTheSameEmailExists(value);

          case 12:
            result = _context3.sent;

            if (!(result !== 0)) {
              _context3.next = 20;
              break;
            }

            // if validation failed
            _errorObjJSON = (0, _stringify["default"])(singleErrorToErrorObjDTO('email', "Create user: \"".concat(value.email, "\" is used")));
            logger.info(_errorObjJSON);
            emitUserFailedValidation(_errorObjJSON);
            throw new ValidationError(_errorObjJSON);

          case 20:
            _context3.next = 22;
            return usersService.addUser(value);

          case 22:
            _yield$usersService$a = _context3.sent;
            id = _yield$usersService$a.id;
            _context3.next = 26;
            return usersService.getUserById(id);

          case 26:
            user = _context3.sent;
            res.send(user);

          case 28:
            _context3.next = 33;
            break;

          case 30:
            _context3.prev = 30;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 30]]);
  }));

  return function createUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var editUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var body, id, _editUserSchema$valid, value, error, errorObjJSON, amountOfTheSameEmails, _errorObjJSON2, user;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            body = req.body;
            id = req.params.id;
            _editUserSchema$valid = editUserSchema.validate(body), value = _editUserSchema$valid.value, error = _editUserSchema$valid.error;

            if (!error) {
              _context4.next = 11;
              break;
            }

            errorObjJSON = (0, _stringify["default"])(joiErrorDetailsToErrorObjDTO(error.details));
            logger.info('editUserFailedValidation', errorObjJSON);
            emitUserFailedValidation(errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 11:
            if (!value.email) {
              _context4.next = 15;
              break;
            }

            _context4.next = 14;
            return usersService.isTheSameEmailExists(value);

          case 14:
            amountOfTheSameEmails = _context4.sent;

          case 15:
            if (!(amountOfTheSameEmails !== 0 && typeof amountOfTheSameEmails !== 'undefined')) {
              _context4.next = 22;
              break;
            }

            // if validation failed
            _errorObjJSON2 = (0, _stringify["default"])(singleErrorToErrorObjDTO('email', "Edit user: \"".concat(value.email, "\" is used")));
            logger.info('editUserFailedValidation', _errorObjJSON2);
            emitUserFailedValidation(_errorObjJSON2);
            throw new ValidationError(_errorObjJSON2);

          case 22:
            _context4.next = 24;
            return usersService.editUser(id, value);

          case 24:
            _context4.next = 26;
            return usersService.getUserById(id);

          case 26:
            user = _context4.sent;
            res.send(user);

          case 28:
            _context4.next = 33;
            break;

          case 30:
            _context4.prev = 30;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 33:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 30]]);
  }));

  return function editUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return usersService.deleteEmployee(id);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function deleteUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  addUserSchema: addUserSchema,
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  editUser: editUser,
  deleteUser: deleteUser
};