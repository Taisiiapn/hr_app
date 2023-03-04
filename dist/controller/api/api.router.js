"use strict";

var _require = require('express'),
    Router = _require.Router;

var departmentsRouter = require('./departments/departments.router');

var usersRouter = require('./users/users.router');

var router = Router();
router.use('/departments', departmentsRouter);
router.use('/users', usersRouter);
module.exports = router;