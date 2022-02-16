const logger = require('../../config/logger');
const controller = require('./employees.controller')


module.exports = {

    employeesRoute: (req, res) => {

        const departmentid = req.params.departmentId

        controller.renderEmployees(departmentid)
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error('employeesRoute', error)
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.end(error.message)
            })
    },

    addEmployeeRoute: (req, res) => new Promise((resolve, reject) => {
    
        const { departmentId } = req.params
        const query = req.query

        const parameters = Object.assign({})

        if(query.error) {
            parameters.error = query.error
        }
        if(query.body) {
            parameters.values = JSON.parse(query.body)
        }

        controller.renderCreateEmployee(parameters, departmentId)
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
                resolve(html)
            })
            .catch(error => {
                logger.error('addEmployeeRoute', error)
                res.writeHead(500, { 'Content-Type': 'text/html' })
                reject(error)
            })
    }),

    editEmployeeRoute: (req, res) => new Promise((resolve, reject) => {

        const { departmentId } = req.params
        const { employeeId } = req.params
        const query = req.query


        controller.renderEditEmployee(employeeId, departmentId, query)
            .then(html => {
                resolve(html)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error('editEmployeeRoute', error)
                reject(error)
            })
    }),

    addEmployeeAction: (req, res) => {

        const { departmentId } = req.params

        const body = req.body

            controller.addEmployee(departmentId, body)
                .then(validationError => {
                    if (validationError) {
                        const bodyJSON = JSON.stringify(body)

                        const redirectUrl = `/departments/${departmentId}/employees/create?body=${bodyJSON}&error=${validationError}`
                        res.writeHead(301, { 'Location':  redirectUrl });
                        return res.end();
                    }
                    res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                    res.end()
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' }) 
                    res.end(error.message)
                    logger.error('addEmployeeAction', error)
                })
    },

    editEmployeeAction: (req, res) => {

        const { departmentId } = req.params
        const { employeeId } = req.params

        const body = req.body

            controller.editEmployee(employeeId, body)
                .then(validationError => {
                    if (validationError) {
                        const bodyJSON = JSON.stringify(body)

                        const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                        res.writeHead(301, { 'Location':  redirectUrl })
                        return res.end()
                    }
                    res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                    res.end()
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain'})
                    res.end(error.message)
                    logger.error('editEmployeeAction', error)
                })
    },

    deleteEmployeeAction: (req, res) => {
        
        const { departmentId } = req.params
        const { employeeId } = req.params

        controller.deleteEmployee(employeeId)
            .then(() => {
                res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                res.end()
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain'})
                res.end(error.message)
                logger.error(error)
            })
    },
}