const {Router} = require("express");
const departmentController = require('./departments.controller')
const {tokenRequired, isAdminRoleOrEmployeeWithRelevantParamsId, isAdminRole} = require("../../auth/auth.middleware");
const router = Router()


router.use('*', tokenRequired)
router.get('/', isAdminRole, departmentController.getDepartments)
router.get('/:departmentId', isAdminRoleOrEmployeeWithRelevantParamsId, departmentController.getDepartmentById)
router.post('/create', isAdminRole, departmentController.addDepartment)
//router.post('/:departmentId/employee_create', isAdminRole, departmentController.addEmployee)
router.put('/:id/update', isAdminRole, departmentController.editDepartment)
router.delete('/:id/delete', isAdminRole, departmentController.deleteDepartment)


module.exports = router;