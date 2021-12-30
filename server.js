const http = require('http');
const url = require('url');
const departmentsController = require('./controller/departments')
const commonController = require('./controller/common');
const employeesController = require('./controller/employees/index')

const rootRegexp = /^\/$/
const departmentsRootRegexp = /^\/departments$/
const departmentIdRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
const addingRegexp = /^\/departments\/create$/
const updatingRegexp = /^\/departments\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/update$/

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true).pathname

    // on views requests
    if (req.method.toLowerCase() === 'get') {

        // route to /
        if (rootRegexp.test(parsedUrl)) {
            commonController.rootRouteRedirect(req, res)
        }


        // route to /departments
        if (departmentsRootRegexp.test(parsedUrl)) {
            departmentsController.departmentsRootRoute(req, res)
        } 


        // route to /departments/:id
        if (departmentIdRegexp.test(req.url)) {
            employeesController.employeesRouteRedirect(req, res)
        }

        // route to /departments/create
        if (addingRegexp.test(req.url)) {
            departmentsController.addDepartmentRoute(req, res)
        }

        // route to /departments/id/update
        if (updatingRegexp.test(req.url)) {
            departmentsController.editDepartmentRoute(req, res)
        }

        // route to /departments/:id for showing every employee
        if (departmentIdRegexp.test(req.url)) {
            
        }

        commonController.routeNotFound(req, res)

    } else


    // on forms requests
    if (req.method.toLowerCase() === 'put' 
        || req.method.toLowerCase() === 'post' 
        || req.method.toLowerCase() === 'delete') {


        // route to /departments/:id for deleting department
        if (departmentIdRegexp.test(req.url 
            && req.method.toLowerCase() === 'delete')) {
            departmentsController.deleteDepartmentAction(req, res)
        }

        // route to /departments/create
        if (addingRegexp.test(req.url)) {
            departmentsController.addDepartmentAction(req, res)
        }

        // route to /departments/:id/update
        if (updatingRegexp.test(req.url)) {
            departmentsController.editDepartmentAction(req, res)
        }
    } else {

        commonController.routeNotFound(req, res)
        
    }
    
}).listen(3000, () => console.log('Server works'))