const { parseBodyStringToObj } = require('../utils');
const controller = require('./employees.controller')
const url = require('url');


module.exports = {

    employeesRoute: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const parsedUrl = req.url.split('/');
        const departmentid = parsedUrl[parsedUrl.length - 1]

        controller.renderEmployees(departmentid, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    addEmployeeRoute: (req, res) => {
        
        let parseObj = url.parse(req.url, true)
        let parsedQuery = parseObj.query

        const parsedUrl = req.url.split('/');
        const departmentId = parsedUrl[parsedUrl.length - 3]

        const parameters = Object.assign({})

        if(parsedQuery.error) {
            parameters.error = parsedQuery.error;
        }
        if(parsedQuery.body) {
            parameters.values = JSON.parse(parsedQuery.body);
        }

        controller.renderCreateEmployee(parameters, departmentId, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    editEmployeeRoute: (req, res) => {

        const parsedUrl = req.url.split('/');
        const employeeId = parsedUrl[parsedUrl.length - 2]
        const departmentId = parsedUrl[parsedUrl.length - 4]

        let parseObj = url.parse(req.url, true)
        let parsedQuery = parseObj.query


        controller.renderEditEmployee(employeeId, departmentId, parsedQuery, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    addEmployeeAction: (req, res) => {

        const parsedUrl = req.url.split('/');
        const departmentId = parsedUrl[parsedUrl.length - 3]

        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            controller.addEmployee(departmentId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end(error.message)
                }

                if (validationError) {

                    const bodyObj = parseBodyStringToObj(body)
                    const bodyObjJSON = JSON.stringify(bodyObj)

                    const redirectUrl = `/departments/${departmentId}/employees/create?body=${bodyObjJSON}&error=${validationError}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            })

        });
    },

    editEmployeeAction: (req, res) => {

        const parsedUrl = req.url.split('/');
        const employeeId = parsedUrl[parsedUrl.length - 2]
        const departmentId = parsedUrl[parsedUrl.length - 4]

        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            controller.editEmployee(employeeId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    return res.end(error.message)
                }

                if (validationError) {

                    const bodyObj = parseBodyStringToObj(body)
                    const bodyObjJSON = JSON.stringify(bodyObj)

                    const redirectUrl = `update?body=${bodyObjJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            })
  
        });
    },

    deleteEmployeeAction: (req, res) => {
        const parsedUrl = req.url.split('/');
        const departmentId = parsedUrl[parsedUrl.length - 4]
        const employeeId = parsedUrl[parsedUrl.length - 2]

        controller.deleteEmployee(employeeId, (error) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end(error.message)
            } else {
                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            }
        }) 
    },
}