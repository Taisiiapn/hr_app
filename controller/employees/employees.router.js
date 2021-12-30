const controller = require('./controller')


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
    }
}