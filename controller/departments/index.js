const controller = require('./controller')


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

    // edit department route

    deleteDepartmentAction: (req, res) => {
        const parsedUrl = req.url.split('/');
        const id = parsedUrl[parsedUrl.length - 1]

        controller.deleteDepartment(id) 

        res.writeHead(301, { 'Location':  '/departments' });
        res.end();
    },

    // add department action

    // edit department action

}