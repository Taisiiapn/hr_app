const { logger, errorNames } = require('../../config/logger');
const { proceedError } = require('../utils');
const controller = require('./department.controller')


module.exports = {

    departmentsRootRoute: async (req, res) => {
        try {
            const html = await controller.renderDepartments()
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)
            
        } catch (error) {
            logger.error(errorNames.departments.DEPARTMENTS_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }     
    },

    addDepartmentRoute: async (req, res) => {

        try {

            let query = req.query

            const parameters = Object.assign({})

            if(query.error) {
                parameters.error = query.error
            }
            if(query.body) {
                parameters.values = JSON.parse(query.body)
            }

            const html = await controller.renderCreateDepartment(parameters)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html)

        } catch(error) {

            logger.error(errorNames.departments.DEPARTMENT_CREATE_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }
    },

    editDepartmentRoute: async (req, res) => {

        try {

            const { departmentId } = req.params
            const query = req.query

            const html = await controller.renderEditDepartment(departmentId, query)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)

        } catch(error) {

            logger.error(errorNames.departments.DEPARTMENT_UPDATE_RENDER, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }
    },

    deleteDepartmentAction: async (req, res) => {

        try {

            const { departmentId } = req.params

            controller.deleteDepartment(departmentId)
        
            res.writeHead(301, { 'Location':  '/departments' })
            res.end()

        } catch (error) {

            logger.error(errorNames.departments.DEPARTMENT_DELETE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
        }

    },

    addDepartmentAction: async (req, res) => {

        try {
            const body = req.body

            const validationError = await controller.addDepartment(body)
            
            if (validationError) {
                const bodyJSON = JSON.stringify(body)

                const redirectUrl = `create?body=${bodyJSON}&error=${validationError.message}`
                res.writeHead(301, { 'Location':  redirectUrl })
                res.end()
            } else {
                res.writeHead(301, { 'Location':  '/departments' })
                res.end()
            }
        } catch(error) {

            logger.error(errorNames.departments.DEPARTMENT_CREATE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)

        }  
    },

    editDepartmentAction: async (req, res) => {

        try {

            const { departmentId } = req.params
            
            const body = req.body

            const validationError = await controller.editDepartment(departmentId, body)

            if (validationError) {
                const bodyJSON = JSON.stringify(body)

                const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                res.writeHead(301, { 'Location':  redirectUrl })
                res.end()
            } else {
                res.writeHead(301, { 'Location':  '/departments' })
                res.end()
            }

        } catch(error) {

            logger.error(errorNames.departments.DEPARTMENT_UPDATE_ACTION, error)
            const proceededError = proceedError(error)
            res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
            res.end(proceededError.message)
            
        }
    }

}