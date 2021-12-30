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

    // addEmployee
    // editEmployee
    // showEmployee
    // deleteEmployee
}