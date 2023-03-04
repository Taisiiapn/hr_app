"use strict";

require('./model/index');

var _require = require('./sequelize'),
    sequelize = _require.sequelize;

var force = process.env.FORCE_SYNC;
var isForce = force === 'true';
sequelize.sync({
  force: !!force
}).then(function () {
  console.log("".concat(isForce ? 'Force sync' : 'Sync', " success"));
  process.exit(0);
})["catch"](function (e) {
  console.error("".concat(isForce ? 'Force sync' : 'Sync', " error: "), e.message);
  process.exit(0);
});