const http = require('http');
const url = require('url');
const departmentsRouter = require('./controller/departments/department.router')
const commonController = require('./controller/common');
const employeesRouter = require('./controller/employees/employees.router')

const rootRegexp = /^\/$/
const departmentsRootRegexp = /^\/departments$/
const departmentIdRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
const addingRegexp = /^\/departments\/create$/
const updatingRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/update$/
const deletingRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/delete$/

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
            employeesRouter.employeesRouteRedirect(req, res)
        } else

        // route to /departments/create
        if (addingRegexp.test(parsedUrl)) {
            departmentsRouter.addDepartmentRoute(req, res)
        } else

        // route to /departments/id/update
        if (updatingRegexp.test(parsedUrl)) {
            departmentsRouter.editDepartmentRoute(req, res)
        } else

        // route to /departments/:id for showing every employee
        // if (departmentIdRegexp.test(parsedUrl)) {
        //     employeesRouter.addEmployeeRoute(req, res)
        // } 
        
        // else 
        {
            commonController.routeNotFound(req, res)
        }

        

    } else


    // on forms requests
    if (req.method.toLowerCase() === 'post') {


        // route to /departments/:id for deleting department
        if (deletingRegexp.test(parsedUrl 
            && req.method.toLowerCase() === 'delete')) {
            departmentsRouter.deleteDepartmentAction(req, res)
        } else

        // route to /departments/create
        if (addingRegexp.test(parsedUrl)) {
            departmentsRouter.addDepartmentAction(req, res)
        }

        // route to /departments/:id/update
        if (updatingRegexp.test(parsedUrl)) {
            departmentsRouter.editDepartmentAction(req, res)
        }


        // employeesRouter.addEmployeeAction
        // todo employees actions

    } else {

        commonController.routeNotFound(req, res)
        
    }
    
}).listen(3000, () => console.log('Server works'))