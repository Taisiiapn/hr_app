const express = require('express')
const app = express()
const departmentsRouter = require('./controller/departments/department.router')
const commonController = require('./controller/common');
const employeesRouter = require('./controller/employees/employees.router')


app.get('/', commonController.rootRouteRedirect)
app.get('/departments', (req, res) => departmentsRouter.departmentsRootRoute(req, res))
app.get('/departments/create', (req, res) => departmentsRouter.addDepartmentRoute(req, res))
app.get('/departments/:departmentId', (req, res) => employeesRouter.employeesRoute(req, res))
app.get('/departments/:departmentId/update', (req, res) => departmentsRouter.editDepartmentRoute(req, res))
app.get('/departments/:departmentId/employees/create', (req, res) => employeesRouter.addEmployeeRoute(req, res))
app.get('/departments/:departmentId/employees/:employeeId/update', (req, res) => employeesRouter.editEmployeeRoute(req, res))
app.post('/departments/create', (req, res) => departmentsRouter.addDepartmentAction(req, res))
app.post('/departments/:departmentId', (req, res) => departmentsRouter.deleteDepartmentAction(req, res))
app.post('/departments/:departmentId/update', (req, res) => departmentsRouter.editDepartmentAction(req, res))
app.post('/departments/:departmentId/employees/create', (req, res) => employeesRouter.addEmployeeAction(req, res))
app.post('/departments/:departmentId/employees/:employeeId/update', (req, res) => employeesRouter.editEmployeeAction(req, res))
app.post('/departments/:departmentId/employees/:employeeId/delete', (req, res) => employeesRouter.deleteEmployeeAction(req, res))
app.use('*', (req, res) => commonController.routeNotFound(req, res))


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
