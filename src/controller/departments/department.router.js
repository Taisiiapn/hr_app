const logger = require('../../config/logger');
const { proceedError } = require('../utils');
const controller = require('./department.controller')


module.exports = {

    departmentsRootRoute: (req, res) => {
        
        controller.renderDepartments()
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error('departmentsRootRoute router', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    addDepartmentRoute: (req, res) => {

        let query = req.query

        const parameters = Object.assign({})

        if(query.error) {
            parameters.error = query.error
        }
        if(query.body) {
            parameters.values = JSON.parse(query.body)
        }

        controller.renderCreateDepartment(parameters)
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            })
            .catch(error => {
                logger.error('addDepartmentRoute router', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    editDepartmentRoute: (req, res) => {

        const { departmentId } = req.params
        const query = req.query


        controller.renderEditDepartment(departmentId, query)
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error('editDepartmentRoute router', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    deleteDepartmentAction: (req, res) => {

        const { departmentId } = req.params

        controller.deleteDepartment(departmentId)
            .then(() => {
                res.writeHead(301, { 'Location':  '/departments' })
                res.end()
            })
            .catch(error => {
                logger.error('deleteDepartmentAction router', error)
                const proceededError = proceedError(error)
                res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                res.end(proceededError.message)
            })
    },

    addDepartmentAction: (req, res) => {

        const body = req.body

            controller.addDepartment(body)
                .then(validationError => {
                    if (validationError) {
                        const bodyJSON = JSON.stringify(body)

                        const redirectUrl = `create?body=${bodyJSON}&error=${validationError.message}`
                        res.writeHead(301, { 'Location':  redirectUrl })
                        res.end()
                    } else {
                        res.writeHead(301, { 'Location':  '/departments' })
                        res.end()
                    }
                })
                .catch(error => {
                    logger.error('addDepartmentAction router', error)
                    const proceededError = proceedError(error)
                    res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                    res.end(proceededError.message)
                })  
    },

    editDepartmentAction: (req, res) => {

        const { departmentId } = req.params
        
        const body = req.body

            controller.editDepartment(departmentId, body)
                .then(validationError => {
                    if (validationError) {
                        const bodyJSON = JSON.stringify(body)

                        const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                        res.writeHead(301, { 'Location':  redirectUrl })
                        res.end()
                    } else {
                        res.writeHead(301, { 'Location':  '/departments' })
                        res.end()
                    }
                })
                .catch(error => {
                    logger.error('editDepartmentAction', error)
                    const proceededError = proceedError(error)
                    res.writeHead(proceededError.status, { 'Content-Type': 'text/html' })
                    res.end(proceededError.message)
                })
    }

}