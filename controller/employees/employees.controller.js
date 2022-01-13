const departments = require('../../index')
const ejs = require('ejs')

module.exports = {
    renderEmployees: (id, cb) => {

        let filteredDepartmentsById = departments
            .filter(departments => departments.id == id)[0]

        ejs.renderFile(__dirname + '/../../views/employees/employeesList.ejs',
                {data: filteredDepartmentsById}, 
                function (err, html) {
                    if (err) {
                        cb(err)
                        console.log('err debugging', err);
                    } else {
                        cb( null, html)
                    }
                }
        )
    },

    renderCreateEmployee: (cb) => {

        ejs.renderFile(__dirname + '/../../views/employees/createEmployee.ejs',
                {},
                function (err, html) {
                    if (err) {
                        cb(err)
                        console.error('err debugging', err);
                    } else {
                        cb( null, html)
                    }
                }
        )

    },

    addEmployee: (id, value) => {
        const newEmployee  = {
            id: '',
            name: value,
            salary: Math.floor(Math.random() * 10000) + 1000
        }

        departments.forEach(department => department.id === id 
            && department.employees.push(newEmployee)) 
    },

    // addEmployee
    // editEmployee
    // deleteEmployee
}