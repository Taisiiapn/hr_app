const { logger, errorNames } = require('../../config/logger');
const { proceedError } = require('../utils');
const controller = require('./employees.controller')


module.exports = {

    employeesRoute: async (req, res) => {

        try {

            const departmentid = req.params.departmentId

            const html = await controller.renderEmployees(departmentid)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)

        } catch (error) {

            logger.error(errorNames.employee.EMPLOYEES_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }
    },

    addEmployeeRoute: async (req, res) => {

        try {
    
            const { departmentId } = req.params
            const query = req.query

            const html = await controller.renderCreateEmployee(query, departmentId)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)

        } catch(error) {

            logger.error(errorNames.employee.EMPLOYEE_CREATE_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }
    },

    editEmployeeRoute: async (req, res) => {

        try {

            const { departmentId } = req.params
            const { employeeId } = req.params
            const query = req.query


            const html = await controller.renderEditEmployee(employeeId, departmentId, query)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)

        } catch(error) {

            logger.error(errorNames.employee.EMPLOYEE_UPDATE_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }
    },

    addEmployeeAction: async (req, res) => {

        try {

            const { departmentId } = req.params

            const body = req.body

            const validationError = await controller.addEmployee(departmentId, body)
            if (validationError) {
                const bodyJSON = JSON.stringify(body)

                const redirectUrl = `/departments/${departmentId}/employees/create?body=${bodyJSON}&error=${validationError}`
                res.writeHead(301, { 'Location':  redirectUrl });
                res.end();
            } else {
                res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                res.end()
            }

        } catch(error) {

            logger.error(errorNames.employee.EMPLOYEE_CREATE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/plain' }) 
            res.end(proceededError.message)
        }
    },

    editEmployeeAction: async (req, res) => {

        try {

            const { departmentId } = req.params
            const { employeeId } = req.params

            const body = req.body

            const validationError = await controller.editEmployee(employeeId, body)

            if (validationError) {
                const bodyJSON = JSON.stringify(body)

                const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                res.writeHead(301, { 'Location':  redirectUrl })
                res.end()
            } else {
                res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
                res.end()
            }
        } catch(error) {

            logger.error(errorNames.employee.EMPLOYEE_UPDATE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/plain'})
            res.end(proceededError.message)
        }
    },

    deleteEmployeeAction: async (req, res) => {

        try {
        
            const { departmentId } = req.params
            const { employeeId } = req.params

            await controller.deleteEmployee(employeeId)
            res.writeHead(301, { 'Location':  `/departments/${departmentId}` })
            res.end()

        } catch(error) {

            logger.error(errorNames.employee.EMPLOYEE_DELETE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)

        }
    },
}