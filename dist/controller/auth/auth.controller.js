"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var Joi = require('joi');

var bcrypt = require("bcryptjs");

var _require = require('../../config/logger'),
    logger = _require.logger;

var jwt = require("jsonwebtoken");

var jwtDecode = require("jwt-decode");

var employeesService = require("../../services/user.service");

var _require2 = require("../../services/eventEmitter.service"),
    emitAuthFailedValidation = _require2.emitAuthFailedValidation;

var _require3 = require('../utils'),
    joiErrorDetailsToErrorObjDTO = _require3.joiErrorDetailsToErrorObjDTO,
    singleErrorToErrorObjDTO = _require3.singleErrorToErrorObjDTO,
    ValidationError = _require3.ValidationError;

var loginSchema = Joi.object({
  email: Joi.string().empty().email({
    tlds: {
      allow: false
    }
  }).message('Invalid email').required(),
  password: Joi.string().empty().alphanum().min(3).max(16).message('password', 'Invalid password').required()
}).unknown();

var me = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.token;
            decoded = jwtDecode(token);
            _context.next = 5;
            return employeesService.getAuthUserById(decoded.id);

          case 5:
            user = _context.sent;
            res.json(user);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function me(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var values, _loginSchema$validate, value, error, errorObjJSON, email, password, user, hashPassword, departmentId, userId, isValidPassword, token, _errorObjJSON;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            values = req.body;
            _loginSchema$validate = loginSchema.validate(values), value = _loginSchema$validate.value, error = _loginSchema$validate.error;

            if (!error) {
              _context2.next = 10;
              break;
            }

            errorObjJSON = (0, _stringify["default"])(joiErrorDetailsToErrorObjDTO(error.details));
            emitAuthFailedValidation(errorObjJSON);
            logger.info('AuthFailedValidation', errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 10:
            email = value.email, password = value.password;
            _context2.next = 13;
            return employeesService.getUserByEmailAuth(email);

          case 13:
            user = _context2.sent;
            hashPassword = user.password;
            departmentId = user.departmentid;
            userId = user.id;
            _context2.next = 19;
            return bcrypt.compareSync(password, hashPassword);

          case 19:
            isValidPassword = _context2.sent;

            if (!isValidPassword) {
              _context2.next = 25;
              break;
            }

            token = jwt.sign({
              id: userId,
              departmentid: departmentId,
              role: user.role
            }, process.env.JWT_KEY, {
              expiresIn: "24h"
            });
            res.cookie('token', token).json({
              token: token
            });
            _context2.next = 28;
            break;

          case 25:
            _errorObjJSON = (0, _stringify["default"])(singleErrorToErrorObjDTO('password', "Password is invalid"));
            logger.info("Password is invalid", _errorObjJSON);
            throw new ValidationError(_errorObjJSON);

          case 28:
            _context2.next = 33;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 30]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  me: me,
  login: login
};