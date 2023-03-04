"use strict";

var _require = require("express"),
    Router = _require.Router;

var departmentController = require('./departments.controller');

var _require2 = require("../../auth/auth.middleware"),
    tokenRequired = _require2.tokenRequired,
    isAdminRoleOrEmployeeWithRelevantParamsId = _require2.isAdminRoleOrEmployeeWithRelevantParamsId,
    isAdminRole = _require2.isAdminRole;

var router = Router();
router.use('*', tokenRequired);
router.get('/', isAdminRole, departmentController.getDepartments);
router.get('/:departmentId', isAdminRoleOrEmployeeWithRelevantParamsId, departmentController.getDepartmentById);
router.post('/create', isAdminRole, departmentController.addDepartment);
router.post('/:departmentId/employee_create', isAdminRole, departmentController.addEmployee);
router.put('/:id/update', isAdminRole, departmentController.editDepartment);
router["delete"]('/:id/delete', isAdminRole, departmentController.deleteDepartment);
module.exports = router;