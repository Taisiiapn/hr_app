const { parseBodyStringToObj } = require('../utils');
const controller = require('./department.controller')
const url = require('url');


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
        
        //  todo parse possible validation failed parameters from req.url to fill view form

        let parseObj = url.parse(req.url, true)
        let parsedQuery = parseObj.query

        const parameters = Object.assign({});

        if(parsedQuery.error) {
            parameters.error = parsedQuery.error;
        }
        if(parsedQuery.body) {
            parameters.values = JSON.parse(parsedQuery.body);
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

        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 2]

        let parseObj = url.parse(req.url, true)
        let parsedQuery = parseObj.query


        controller.renderEditDepartment(id, parsedQuery, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    deleteDepartmentAction: (req, res) => {
        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 2]

        controller.deleteDepartment(id, (error) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end(error.message)
            } else {
                res.writeHead(301, { 'Location':  '/departments' });
                // res.writeHead(200, { 'Content-Type': 'text/html' });
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
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    return res.end(error.message);
                } 
                if (validationError) {
                    // bad validation case 
                    
                    // todo parse body to json string
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

        const parsedUrl = req.url.split('/');
        //todo get id from string through the regex.exec (expression has to has /\?.*/ at the end)
        const id = parsedUrl[parsedUrl.length - 2]

        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            controller.editDepartment(id, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    return res.end(error.message)
                }

                if (validationError) {
                    // bad validation case 
                    
                    // todo parse body to json string
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