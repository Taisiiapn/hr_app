// todo redirect from / to /departments
// todo always return html string rendered by ejs
// todo find the best way todo routing in playing http module
// todo use 'include' functionality ejs

const http = require('http');
const ejs = require('ejs')
const fs = require('fs');
const path = require('path');
const departments = require('../index.js')

http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.writeHead(301, { 'Location':  '/departments'});
            res.end();
            break;
        
        case '/departments':
            res.writeHead(301, { 'Content-Type': 'text/html' });

            ejs.renderFile(__dirname + '/../views/controllerButtons.ejs',
                    {departments: departments}, 
                    function (err, html) {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            console.log('err debugging', err);
                        } else {
                            console.log('departments debugging', html);
                            res.end(html, departments.departments)
                        }
                    }
            )
            break;

        case '/departments/employees':
            res.writeHead(301, { 'Content-Type': 'text/html' });

            ejs.renderFile(__dirname + '/../views/listSkeleton.ejs',
                    function (err, html) {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            console.log('err debugging', err);
                        } else {
                            console.log('departments debugging', html);
                            res.end(html)
                        }
                    }
            )
            break;

        case '/departments/add':
            res.writeHead(301, { 'Content-Type': 'text/html' });

            ejs.renderFile(__dirname + '/../views/addDepartment.ejs',
            function (err, html) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    console.log('err debugging', err);
                } else {
                    console.log('departments debugging', html);
                    res.end(html)
                }
            }
            )
            break;

        case '/departments/edit':
            res.writeHead(301, { 'Content-Type': 'text/html' });

            ejs.renderFile(__dirname + '/../views/editDepartment.ejs',
            function (err, html) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    console.log('err debugging', err);
                } else {
                    console.log('departments debugging', html);
                    res.end(html)
                }
            }
            )
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 not found!!!!');
    }
    
}).listen(3000, () => console.log('Server works'))