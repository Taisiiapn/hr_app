const {Router} = require("express");
const usersController = require('./users.controller')
const {tokenRequired, isAdminRole, complexGetAllUsersCheck} = require("../../auth/auth.middleware");
const router = Router()

router.use('*', tokenRequired)
router.get('/', complexGetAllUsersCheck, usersController.getUsers)
router.get('/:userid', usersController.getUserById)
router.get('/:departmentid', complexGetAllUsersCheck, usersController.getUsers)
router.post('/create', isAdminRole, usersController.createUser)
router.put('/:id/update', isAdminRole, usersController.editUser)
router.delete('/:id/delete', isAdminRole, usersController.deleteUser)

module.exports = router;