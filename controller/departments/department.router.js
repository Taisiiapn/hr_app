const { parseBodyStringToObj } = require('../utils');
const controller = require('./department.controller')


module.exports = {

    departmentsRootRoute: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        controller.renderDepartments((error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    addDepartmentRoute: (req, res) => {

        let query = req.query

        const parameters = Object.assign({});

        if(query.error) {
            parameters.error = query.error;
        }
        if(query.body) {
            parameters.values = JSON.parse(query.body);
        }

        controller.renderCreateDepartment(parameters, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    editDepartmentRoute: (req, res) => {

        const { departmentId } = req.params
        const query = req.query


        controller.renderEditDepartment(departmentId, query, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    deleteDepartmentAction: (req, res) => {

        const { departmentId } = req.params

        controller.deleteDepartment(departmentId, (error) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end(error.message)
            } else {
                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
            }
        }) 
    },

    addDepartmentAction: (req, res) => {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            controller.addDepartment(body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end(error.message);
                } 
                if (validationError) {
                    
                    const bodyObj = parseBodyStringToObj(body)
                    const bodyObjJSON = JSON.stringify(bodyObj)

                    const redirectUrl = `create?body=${bodyObjJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }
                
                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
                
            })
            
        });
    },

    editDepartmentAction: (req, res) => {

        const { departmentId } = req.params
        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            controller.editDepartment(departmentId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    return res.end(error.message)
                }

                if (validationError) {
                    // bad validation case 
                    
                    const bodyObj = parseBodyStringToObj(body)
                    const bodyObjJSON = JSON.stringify(bodyObj)

                    const redirectUrl = `update?body=${bodyObjJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
            })
  
        });
    }

}