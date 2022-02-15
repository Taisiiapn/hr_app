const logger = require('../../config/logger');
const controller = require('./employees.controller')


module.exports = {

    employeesRoute: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const departmentid = req.params.departmentId

        controller.renderEmployees(departmentid, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.end(html)
            }
        })
    },

    addEmployeeRoute: (req, res) => {
    
        const { departmentId } = req.params
        const query = req.query

        const parameters = Object.assign({})

        if(query.error) {
            parameters.error = query.error;
        }
        if(query.body) {
            parameters.values = JSON.parse(query.body);
        }

        controller.renderCreateEmployee(parameters, departmentId, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    editEmployeeRoute: (req, res) => {

        const { departmentId } = req.params
        const { employeeId } = req.params
        const query = req.query


        controller.renderEditEmployee(employeeId, departmentId, query, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    addEmployeeAction: (req, res) => {

        const { departmentId } = req.params

        const body = req.body

            controller.addEmployee(departmentId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' }) 
                    res.end(error.message)
                    return logger.error(error)
                }

                if (validationError) {

                    const bodyJSON = JSON.stringify(body)

                    const redirectUrl = `/departments/${departmentId}/employees/create?body=${bodyJSON}&error=${validationError}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            })
    },

    editEmployeeAction: (req, res) => {

        const { departmentId } = req.params
        const { employeeId } = req.params

        const body = req.body

            controller.editEmployee(employeeId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    res.end(error.message)
                    return logger.error(error)
                }

                if (validationError) {

                    const bodyJSON = JSON.stringify(body)

                    const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            })
    },

    deleteEmployeeAction: (req, res) => {
        
        const { departmentId } = req.params
        const { employeeId } = req.params

        controller.deleteEmployee(employeeId, (error) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end(error.message)
                logger.error(error)
            } else {
                res.writeHead(301, { 'Location':  `/departments/${departmentId}` });
                res.end();
            }
        }) 
    },
}