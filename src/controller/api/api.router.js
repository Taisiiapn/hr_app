const { Router } = require('express')
const departmentsRouter = require('./departments/departments.router');
const usersRouter = require('./users/users.router');
const router = Router()

router.use('/departments', departmentsRouter)
router.use('/users', usersRouter)

module.exports = router