const { resolve } = require('bluebird');
const logger = require('../../config/logger');
const controller = require('./department.controller')


module.exports = {

    departmentsRootRoute: (req, res) => {
        
        controller.renderDepartments()
            .then(html => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error(error)
                // todo 
                // res.writeHead(error.status, { 'Content-Type': 'text/html' })
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.end(error.message)
            })
    },

    addDepartmentRoute: (req, res) => new Promise((resolve, reject) => {

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
                resolve(html)
            })
            .catch(error => {
                logger.error(error)
                res.writeHead(500, { 'Content-Type': 'text/html' })
                reject(error)
            })
    }),

    editDepartmentRoute: (req, res) => new Promise ((route_resolve, route_reject) => {

        const { departmentId } = req.params
        const query = req.query


        controller.renderEditDepartment(departmentId, query)
            .then(html => {
                route_resolve(html)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html)
            })
            .catch(error => {
                logger.error(error)
                route_reject(error)
                res.writeHead(500, { 'Content-Type': 'text/html' })
            })
    }),

    deleteDepartmentAction: (req, res) => {

        const { departmentId } = req.params

        controller.deleteDepartment(departmentId)
            .then(() => {
                res.writeHead(301, { 'Location':  '/departments' })
                res.end()
            })
            .catch(error => {
                logger.error(error)
                res.writeHead(500, { 'Content-Type': 'text/plain'})
                res.end(error.message)
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
                    } 
                    res.writeHead(301, { 'Location':  '/departments' })
                    res.end()
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' })
                    res.end(error.message)
                    logger.error(error)
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
                    }
                    res.writeHead(301, { 'Location':  '/departments' })
                    res.end()
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain'})
                    res.end(error.message)
                    logger.error(error)
                })
    }

}