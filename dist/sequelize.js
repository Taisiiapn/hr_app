"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var postgres = require('./config/sequelize');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var _require2 = require('./config/logger'),
    logger = _require2.logger;

var sequelize = new Sequelize(postgres.options);

var checkDBConnection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sequelize.authenticate();

          case 3:
            console.log('The database connection was successfully established');
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log('Unable to connect to database: ', _context.t0);
            logger.error('Unable to connect to database: ', _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function checkDBConnection() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  sequelize: sequelize,
  checkDBConnection: checkDBConnection
};