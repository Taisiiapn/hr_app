const ejs = require('ejs')
const employeesModel = require('../../model/employees.model')

module.exports = {
    renderEmployees: (id, cb) => {

        employeesModel.getEmployeesById((error, employees) => {
            if (error) {
                cb(error)
            } else {

                const employeesForEachDepartment = employees.map(employee => employee.departmentid === id)
                
                ejs.renderFile(__dirname + '/../../views/employees/employeesList.ejs',
                    {data: employeesForEachDepartment}, 
                    function (err, html) {
                        if (err) {
                            cb(err)
                            console.log('err debugging employees', err);
                        } else {
                            cb( null, html)
                        }
                    }
                )
            }
        })
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