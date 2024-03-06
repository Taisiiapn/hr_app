"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context7, _context8; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(source), !0)).call(_context7, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context8 = ownKeys(Object(source))).call(_context8, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var departmentsService = require("../../../services/departments.service");

var _require = require("../../../config/logger"),
    logger = _require.logger;

var _require2 = require("../../../services/eventEmitter.service"),
    emitDepartmentFailedValidation = _require2.emitDepartmentFailedValidation;

var Joi = require("joi");

var _require3 = require("../../utils"),
    ValidationError = _require3.ValidationError,
    dateStrRegExp = _require3.dateStrRegExp,
    validDateCheck = _require3.validDateCheck,
    ageRequirementCheck = _require3.ageRequirementCheck,
    joiErrorDetailsToErrorObjDTO = _require3.joiErrorDetailsToErrorObjDTO,
    singleErrorToErrorObjDTO = _require3.singleErrorToErrorObjDTO;

var _require4 = require("../../../config/constants"),
    user_role = _require4.user_role;

var ROLE_EMPLOYEE = user_role.ROLE_EMPLOYEE,
    ROLE_ADMIN = user_role.ROLE_ADMIN;

var usersService = require("../../../services/user.service");

var addDepartmentSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(16).required()
});
var editDepartmentSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(16).required()
});
var addEmployeeSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  salary: Joi.number(),
  birthday: Joi.string().pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy').custom(validDateCheck).message('Invalid date').custom(ageRequirementCheck).message('Age required to be 18 - 75 years range'),
  email: Joi.string().email({
    tlds: {
      allow: false
    }
  }).required()
}).unknown();

var getDepartments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var departments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return departmentsService.getAllDepartments();

          case 3:
            departments = _context.sent;
            res.send(departments);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getDepartments(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getDepartmentById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var departmentId, role, department;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            departmentId = req.params.departmentId;
            role = req.user.role;

            if (!(role === user_role.ROLE_EMPLOYEE)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return departmentsService.getDepartmentByIdWithEmployees(departmentId);

          case 6:
            department = _context2.sent;
            _context2.next = 12;
            break;

          case 9:
            _context2.next = 11;
            return departmentsService.getDepartmentByIdWithUsers(departmentId);

          case 11:
            department = _context2.sent;

          case 12:
            res.send(department);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function getDepartmentById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var addDepartment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var body, _addDepartmentSchema$, value, error, errorObj, errorObjJSON, result, _errorObj, _errorObjJSON, _yield$departmentsSer, id, department;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            body = req.body;
            _addDepartmentSchema$ = addDepartmentSchema.validate(body), value = _addDepartmentSchema$.value, error = _addDepartmentSchema$.error;

            if (!error) {
              _context3.next = 11;
              break;
            }

            errorObj = joiErrorDetailsToErrorObjDTO(error.details);
            errorObjJSON = (0, _stringify["default"])(errorObj);
            logger.info('addDepartmentFailedValidation', errorObjJSON);
            emitDepartmentFailedValidation(errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 11:
            _context3.next = 13;
            return departmentsService.isTheSameDepartmentNameExists(value);

          case 13:
            result = _context3.sent;

            if (!(result !== 0)) {
              _context3.next = 22;
              break;
            }

            // if validation failed
            _errorObj = singleErrorToErrorObjDTO('name', "Department name \"".concat(value.name, "\" is used"));
            _errorObjJSON = (0, _stringify["default"])(_errorObj);
            logger.info('addDepartmentFailedValidation', _errorObjJSON);
            emitDepartmentFailedValidation(_errorObjJSON);
            throw new ValidationError(_errorObjJSON);

          case 22:
            _context3.next = 24;
            return departmentsService.addDepartment(value);

          case 24:
            _yield$departmentsSer = _context3.sent;
            id = _yield$departmentsSer.id;
            _context3.next = 28;
            return departmentsService.getDepartmentById(id);

          case 28:
            department = _context3.sent;
            res.send(department);

          case 30:
            _context3.next = 35;
            break;

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 35:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 32]]);
  }));

  return function addDepartment(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var addEmployee = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var departmentId, body, _addEmployeeSchema$va, value, error, errorObjJSON, result, _errorObjJSON2, _yield$usersService$a, id, user;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            departmentId = req.params.departmentId;
            body = req.body;
            _addEmployeeSchema$va = addEmployeeSchema.validate(body), value = _addEmployeeSchema$va.value, error = _addEmployeeSchema$va.error;

            if (!error) {
              _context4.next = 11;
              break;
            }

            errorObjJSON = (0, _stringify["default"])(joiErrorDetailsToErrorObjDTO(error.details));
            logger.info('DepartmentFailedValidation', errorObjJSON);
            emitDepartmentFailedValidation(errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 11:
            _context4.next = 13;
            return usersService.isTheSameEmailExists(value);

          case 13:
            result = _context4.sent;

            if (!(result !== 0)) {
              _context4.next = 21;
              break;
            }

            // if validation failed
            _errorObjJSON2 = (0, _stringify["default"])(singleErrorToErrorObjDTO('email', "".concat(value.email, " is used")));
            logger.info('addEmployeeFailedValidation', _errorObjJSON2);
            emitDepartmentFailedValidation(_errorObjJSON2);
            throw new ValidationError(_errorObjJSON2);

          case 21:
            _context4.next = 23;
            return usersService.addUser(_objectSpread(_objectSpread({}, value), {}, {
              role: ROLE_EMPLOYEE,
              departmentid: departmentId // value ????

            }));

          case 23:
            _yield$usersService$a = _context4.sent;
            id = _yield$usersService$a.id;
            _context4.next = 27;
            return usersService.getUserById(id);

          case 27:
            user = _context4.sent;
            res.send(user);

          case 29:
            _context4.next = 34;
            break;

          case 31:
            _context4.prev = 31;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 34:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 31]]);
  }));

  return function addEmployee(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var editDepartment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var body, id, _editDepartmentSchema, value, error, errorObjJSON, result, _errorObjJSON3, department;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            body = req.body;
            id = req.params.id;
            _editDepartmentSchema = editDepartmentSchema.validate(body), value = _editDepartmentSchema.value, error = _editDepartmentSchema.error;

            if (!error) {
              _context5.next = 11;
              break;
            }

            errorObjJSON = (0, _stringify["default"])(joiErrorDetailsToErrorObjDTO(error.details));
            logger.info('editDepartmentFailedValidation', errorObjJSON);
            emitDepartmentFailedValidation(errorObjJSON);
            throw new ValidationError(errorObjJSON);

          case 11:
            _context5.next = 13;
            return departmentsService.getDepartmentById(id);

          case 13:
            _context5.next = 15;
            return departmentsService.isTheSameDepartmentNameExists(value);

          case 15:
            result = _context5.sent;

            if (!(result !== 0)) {
              _context5.next = 23;
              break;
            }

            // if validation failed
            _errorObjJSON3 = (0, _stringify["default"])(singleErrorToErrorObjDTO('name', "Department name \"".concat(value.name, "\" is used")));
            logger.info('editDepartmentFailedValidation', _errorObjJSON3);
            emitDepartmentFailedValidation(_errorObjJSON3);
            throw new ValidationError(_errorObjJSON3);

          case 23:
            _context5.next = 25;
            return departmentsService.editDepartment(id, value);

          case 25:
            _context5.next = 27;
            return departmentsService.getDepartmentById(id);

          case 27:
            department = _context5.sent;
            res.send(department);

          case 29:
            _context5.next = 34;
            break;

          case 31:
            _context5.prev = 31;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 34:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 31]]);
  }));

  return function editDepartment(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteDepartment = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id; // check department exists 

            _context6.next = 4;
            return departmentsService.getDepartmentById(id);

          case 4:
            _context6.next = 6;
            return departmentsService.deleteDepartment(id);

          case 6:
            res.sendStatus(200);
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function deleteDepartment(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  getDepartments: getDepartments,
  getDepartmentById: getDepartmentById,
  addDepartment: addDepartment,
  addEmployee: addEmployee,
  editDepartment: editDepartment,
  deleteDepartment: deleteDepartment
};