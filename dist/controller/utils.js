"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/wrapNativeSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var dateStrRegExp = /^(\d{4}|\d{2})\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12]\d|30|31)$/;

var dateStrToDate = function dateStrToDate(validDateStr) {
  var parsedStr = dateStrRegExp.exec(validDateStr);
  var strDay = parsedStr[3];
  var strMonth = parsedStr[2];
  var strYear = parsedStr[1];
  return new Date(strYear, +strMonth - 1, strDay);
};

var proceedError = function proceedError(error) {
  var result;

  if (error.status) {
    result = error;
  } else {
    throw new InternalError();
  }

  return result;
};

var validDateCheck = function validDateCheck(dateStr) {
  var newDate = dateStrToDate(dateStr);
  var parsedStr = dateStrRegExp.exec(dateStr);
  var strDay = parsedStr[3];
  var strMonth = parsedStr[2];
  var strYear = parsedStr[1];
  var dateDay = newDate.getDate();
  var dateMonth = newDate.getMonth() + 1;
  var dateYear = newDate.getFullYear();

  if (dateDay !== +strDay || dateMonth !== +strMonth || dateYear !== +strYear) {
    throw new BadRequestError('Invalid date');
  }

  return dateStr;
};

var ageRequirementCheck = function ageRequirementCheck(birthdayStr) {
  var now = new Date();
  var minAgeDate = new Date().setFullYear(now.getFullYear() - 18);
  var maxAgeDate = new Date().setFullYear(now.getFullYear() - 75);
  var minAgeMiliseconds = new Date(minAgeDate).getTime();
  var maxAgeMiliseconds = new Date(maxAgeDate).getTime();
  var validationMiliseconds = dateStrToDate(birthdayStr).getTime();

  if (validationMiliseconds <= maxAgeMiliseconds || validationMiliseconds >= minAgeMiliseconds) {
    throw new Error('');
  }

  return birthdayStr;
};

var joiErrorDetailsToErrorObjDTO = function joiErrorDetailsToErrorObjDTO(details) {
  return (0, _reduce["default"])(details).call(details, function (accum, current) {
    var key = current.path;
    var value = current.message;
    accum[key] = value;
    return accum;
  }, {});
};

var singleErrorToErrorObjDTO = function singleErrorToErrorObjDTO(key, value) {
  return (0, _defineProperty2["default"])({}, key, value);
};

var TokenExpiredError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(TokenExpiredError, _Error);

  var _super = _createSuper(TokenExpiredError);

  function TokenExpiredError() {
    var _this;

    (0, _classCallCheck2["default"])(this, TokenExpiredError);
    var message = 'Token expired';
    _this = _super.call(this, message);
    _this.status = 401;
    return _this;
  }

  return (0, _createClass2["default"])(TokenExpiredError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var NotFoundError = /*#__PURE__*/function (_Error2) {
  (0, _inherits2["default"])(NotFoundError, _Error2);

  var _super2 = _createSuper(NotFoundError);

  function NotFoundError() {
    var _this2;

    (0, _classCallCheck2["default"])(this, NotFoundError);
    var message = 'Not found!';
    _this2 = _super2.call(this, message);
    _this2.status = 404;
    return _this2;
  }

  return (0, _createClass2["default"])(NotFoundError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var InternalError = /*#__PURE__*/function (_Error3) {
  (0, _inherits2["default"])(InternalError, _Error3);

  var _super3 = _createSuper(InternalError);

  function InternalError() {
    var _this3;

    (0, _classCallCheck2["default"])(this, InternalError);
    var message = 'Internal server error';
    _this3 = _super3.call(this, message);
    _this3.status = 500;
    return _this3;
  }

  return (0, _createClass2["default"])(InternalError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var BadRequestError = /*#__PURE__*/function (_Error4) {
  (0, _inherits2["default"])(BadRequestError, _Error4);

  var _super4 = _createSuper(BadRequestError);

  function BadRequestError(message) {
    var _this4;

    (0, _classCallCheck2["default"])(this, BadRequestError);
    _this4 = _super4.call(this, message);
    _this4.status = 400;
    return _this4;
  }

  return (0, _createClass2["default"])(BadRequestError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var ValidationError = /*#__PURE__*/function (_Error5) {
  (0, _inherits2["default"])(ValidationError, _Error5);

  var _super5 = _createSuper(ValidationError);

  function ValidationError(errorsObjJSON) {
    var _this5;

    (0, _classCallCheck2["default"])(this, ValidationError);
    _this5 = _super5.call(this, errorsObjJSON);
    _this5.status = 400;
    return _this5;
  }

  return (0, _createClass2["default"])(ValidationError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

module.exports = {
  dateStrRegExp: dateStrRegExp,
  proceedError: proceedError,
  validDateCheck: validDateCheck,
  ageRequirementCheck: ageRequirementCheck,
  joiErrorDetailsToErrorObjDTO: joiErrorDetailsToErrorObjDTO,
  singleErrorToErrorObjDTO: singleErrorToErrorObjDTO,
  TokenExpiredError: TokenExpiredError,
  NotFoundError: NotFoundError,
  InternalError: InternalError,
  BadRequestError: BadRequestError,
  ValidationError: ValidationError
};