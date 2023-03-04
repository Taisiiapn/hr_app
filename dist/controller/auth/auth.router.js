"use strict";

var _require = require("express"),
    Router = _require.Router;

var authController = require('./auth.controller');

var _require2 = require("./auth.middleware"),
    tokenRequired = _require2.tokenRequired;

var router = Router();
router.route('/login').post(authController.login);
router.route('/me').get(tokenRequired, authController.me);
module.exports = router;