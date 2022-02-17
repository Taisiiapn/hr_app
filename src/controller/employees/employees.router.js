const logger = require('../../config/logger');
const { proceedError } = require('../utils');
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
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    addEmployeeRoute: (req, res) => {
    
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
            })
            .catch(error => {
                logger.error('addEmployeeRoute', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    editEmployeeRoute: (req, res) => {

        const { departmentId } = req.params
        const { employeeId } = req.params
        const query = req.query


        controller.renderEditEmployee(employeeId, departmentId, query)
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error('editEmployeeRoute', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    addEmployeeAction: (req, res) => {

        const { departmentId } = req.params

        const body = req.body

            controller.addEmployee(departmentId, body)
                .then(validationError => {
                    if (validationError) {
                        const bodyJSON = JSON.stringify(body)

                        const redirectUrl = `/departments/${departmentId}/employees/create?body=${bodyJSON}&error=${validationError}`
                        res.writeHead(301, { 'Location':  redirectUrl });
                        res.end();
                    } else {
                        res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                        res.end()
                    }
                })
                .catch(error => {
                    logger.error('addEmployeeAction', error)
                    const proceededError = proceedError(error)
                    res.writeHead(proceededError.status, { 'Content-Type': 'text/plain' }) 
                    res.end(proceededError.message)
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
                        res.end()
                    } else {
                        res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                        res.end()
                    }
                })
                .catch(error => {
                    logger.error('editEmployeeAction', error)
                    const proceededError = proceedError(error)
                    res.writeHead(proceededError.status, { 'Content-Type': 'text/plain'})
                    res.end(proceededError.message)
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
                logger.error('deleteEmployeeAction router', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },
}