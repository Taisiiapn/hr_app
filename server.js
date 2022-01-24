const http = require('http');
const url = require('url');
const departmentsRouter = require('./controller/departments/department.router')
const commonController = require('./controller/common');
const employeesRouter = require('./controller/employees/employees.router')

const rootRegexp = /^\/$/
const departmentsRootRegexp = /^\/departments$/
const departmentIdRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
const addingDepartmentRegexp = /^\/departments\/create$/
const updatingRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/update$/
const deletingRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/delete$/
const addingEmployeeRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/employees\/create$/
const updatingEmployeeRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/employees\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/update$/
const deletingEmployeeRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/employees\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/delete$/




http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true).pathname

    // on views requests
    if (req.method.toLowerCase() === 'get') {

        // route to /
        if (rootRegexp.test(parsedUrl)) {
            commonController.rootRouteRedirect(req, res)
        } else


        // route to /departments
        if (departmentsRootRegexp.test(parsedUrl)) {
            departmentsRouter.departmentsRootRoute(req, res)
        } else


        // route to /departments/:id
        if (departmentIdRegexp.test(parsedUrl)) {
            employeesRouter.employeesRoute(req, res)
        } else

        // route to /departments/create
        if (addingDepartmentRegexp.test(parsedUrl)) {
            departmentsRouter.addDepartmentRoute(req, res)
        } else

        // route to /departments/id/update
        if (updatingRegexp.test(parsedUrl)) {
            departmentsRouter.editDepartmentRoute(req, res)
        } else

        // route to /departments/id/employees/create
        if (addingEmployeeRegexp.test(parsedUrl)) {
            employeesRouter.addEmployeeRoute(req, res)
        } else 

        // route to /employees/id/update
        if (updatingEmployeeRegexp.test(parsedUrl)) {
            employeesRouter.editEmployeeRoute(req, res)
        }
        
        else 
        {
            commonController.routeNotFound(req, res)
        }

        

    } else


    // on forms requests
    if (req.method.toLowerCase() === 'post') {


        // route to /departments/:id for deleting department
        if (deletingRegexp.test(parsedUrl)) {
            departmentsRouter.deleteDepartmentAction(req, res)
        } else

        // route to /departments/create
        if (addingDepartmentRegexp.test(parsedUrl)) {
            departmentsRouter.addDepartmentAction(req, res)
        } else

        // route to /departments/:id/update
        if (updatingRegexp.test(parsedUrl)) {
            departmentsRouter.editDepartmentAction(req, res)
        } else

        // route to /departments/id/employees/create
        if (addingEmployeeRegexp.test(parsedUrl)) {
            employeesRouter.addEmployeeAction(req, res)
        } else

        // route to /departments/id/employees/id/update
        if (updatingEmployeeRegexp.test(parsedUrl)) {
            employeesRouter.editEmployeeAction(req, res)
        } else

        // route to /departments/id/employees/id/delete
        if (deletingEmployeeRegexp.test(parsedUrl)) {
            employeesRouter.deleteEmployeeAction(req, res)
        }




    } else {

        commonController.routeNotFound(req, res)
        
    }
    
}).listen(3000, () => console.log('Server works'))