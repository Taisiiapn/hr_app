"use strict";

var _require = require("express"),
    Router = _require.Router;

var usersController = require('./users.controller');

var _require2 = require("../../auth/auth.middleware"),
    tokenRequired = _require2.tokenRequired,
    isAdminRole = _require2.isAdminRole,
    complexGetAllUsersCheck = _require2.complexGetAllUsersCheck;

var router = Router();
router.use('*', tokenRequired);
router.get('/', complexGetAllUsersCheck, usersController.getUsers);
router.get('/:userid', usersController.getUserById);
router.get('/:departmentid', complexGetAllUsersCheck, usersController.getUsers);
router.post('/create', isAdminRole, usersController.createUser);
router.put('/:id/update', isAdminRole, usersController.editUser);
router["delete"]('/:id/delete', isAdminRole, usersController.deleteUser);
module.exports = router;