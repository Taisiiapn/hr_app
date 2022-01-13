const controller = require('./employees.controller')


module.exports = {
    employeesRouteRedirect: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 1]

        controller.renderEmployees(id, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    addEmployeeRoute: (req, res) => {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });

        controller.renderCreateEmployee((error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
            } else {
                res.end(html)
            }
        })
    },

    addEmployeeAction: (req, res) => {

        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 2]

        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const result = body.split('=')

            controller.addEmployee(id, result[result.length - 1])

            res.writeHead(301, { 'Location':  `/departments/${id}/createEmployee` });
            res.end();
  
        });
    },
}