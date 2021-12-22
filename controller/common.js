module.exports = {

    // redirect to /departments
    rootRouteRedirect: (req,res) => {
        res.writeHead(301, { 'Location':  '/departments' });
        res.end();
    },


    // Not Found
    routeNotFound: (req, res) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 not found!!!!');
    }

}