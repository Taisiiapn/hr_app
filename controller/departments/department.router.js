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
        
        res.writeHead(200, { 'Content-Type': 'text/html' });

        controller.renderCreateDepartment((error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    editDepartmentRoute: (req, res) => {
    
        res.writeHead(200, { 'Content-Type': 'text/html' });

        controller.renderEditDepartment((error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    deleteDepartmentAction: (req, res) => {
        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 1]

        controller.deleteDepartment(id) 

        res.writeHead(301, { 'Location':  '/departments' });
        res.end();
    },

    addDepartmentAction: (req, res) => {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const result = body.split('=')

            controller.addDepartment(result[result.length - 1])

            res.writeHead(301, { 'Location':  '/departments' });
            res.end();
  
        });
    },

    editDepartmentAction: (req, res) => {

        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 2]

        controller.editDepartment(id) 

        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const result = body.split('=')

            controller.editDepartment(id, result[result.length - 1])

            res.writeHead(301, { 'Location':  `/departments/${id}/update` });
            res.end();
  
        });
    }

}