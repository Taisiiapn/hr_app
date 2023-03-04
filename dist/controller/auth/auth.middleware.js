"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var jwt = require("jsonwebtoken");

var _require = require("../../config/constants"),
    user_role = _require.user_role;

var _require2 = require("../utils"),
    TokenExpiredError = _require2.TokenExpiredError;

var ROLE_ADMIN = user_role.ROLE_ADMIN,
    ROLE_EMPLOYEE = user_role.ROLE_EMPLOYEE;

var isAdminRole = function isAdminRole(req, res, next) {
  var user = req.user;
  var role = req.query.role;

  if (user.role === ROLE_ADMIN) {
    next();
  } else if (user.role === ROLE_EMPLOYEE) {
    res.sendStatus(401);
  } else {
    res.sendStatus(401);
  }
};

var isAdminRoleOrEmployeeWithRelevantParamsId = function isAdminRoleOrEmployeeWithRelevantParamsId(req, res, next) {
  var user = req.user;
  var departmentId = req.params.departmentId;

  if (user.role === ROLE_EMPLOYEE) {
    user.departmentid === departmentId ? next() : res.sendStatus(401);
  } else if (user.role === ROLE_ADMIN) {
    next();
  } else {
    res.sendStatus(401);
  }
};

var isAdminRoleOrEmployeeWithRelevantQueryId = function isAdminRoleOrEmployeeWithRelevantQueryId(req, res, next) {
  var user = req.user;
  var departmentId = req.query.departmentId;

  if (user.role === ROLE_EMPLOYEE) {
    departmentId === user.departmentid ? next() : res.sendStatus(401);
  } else if (user.role === ROLE_ADMIN) {
    next();
  } else {
    res.sendStatus(401);
  }
};

var complexGetAllUsersCheck = function complexGetAllUsersCheck(req, res, next) {
  var _req$user = req.user,
      id = _req$user.id,
      departmentid = _req$user.departmentid,
      role = _req$user.role;
  var query = req.query;
  var isOnlyRoleSpecified = query.role !== undefined && query.departmentId === undefined;
  var isOnlyDepartmentIdSpecified = query.role === undefined && query.departmentId !== undefined;
  var isRoleAndDepartmentIdSpecified = query.role !== undefined && query.departmentId !== undefined;
  var isRoleAndDepartmentIdNotSpecified = query.role === undefined && query.departmentId === undefined;

  if (isOnlyRoleSpecified || isOnlyDepartmentIdSpecified || isRoleAndDepartmentIdNotSpecified) {
    isAdminRole(req, res, next);
  }

  if (isRoleAndDepartmentIdSpecified) {
    isAdminRoleOrEmployeeWithRelevantQueryId(req, res, next);
  }
};

var tokenRequired = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.token;

            if (token === undefined) {
              res.sendStatus(401);
            }

            _context.next = 4;
            return jwt.verify(token, process.env.JWT_KEY, function (err, result) {
              if (err) {
                next(new TokenExpiredError());
              } else {
                req.user = result;
                next();
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function tokenRequired(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  isAdminRole: isAdminRole,
  isAdminRoleOrEmployeeWithRelevantParamsId: isAdminRoleOrEmployeeWithRelevantParamsId,
  isAdminRoleOrEmployeeWithRelevantQueryId: isAdminRoleOrEmployeeWithRelevantQueryId,
  tokenRequired: tokenRequired,
  complexGetAllUsersCheck: complexGetAllUsersCheck
};