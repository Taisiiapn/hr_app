const departments = require('../../index.js')
const ejs = require('ejs')
const { v4: uuidv4 } = require('uuid');


module.exports = {
    renderDepartments: (cb) => {

        const mutatedDepartments = departments.map(department => {
            return {
                ...department,
                addLink: '/departments/create',
                updateLink: `/departments/${department.id}/update`,
                showLink: `/departments/${department.id}`,
                deleteLink: `/departments/${department.id}`
            }
        })

        ejs.renderFile(__dirname + '/../../views/departments/departmentsList.ejs',
                {data: mutatedDepartments}, 
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

    renderCreateDepartment: (cb) => {

        ejs.renderFile(__dirname + '/../../views/departments/createDepartment.ejs',
                {},
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

    renderEditDepartment: (cb) => {
        ejs.renderFile(__dirname + '/../../views/departments/editDepartment.ejs',
                {},
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

    addDepartment: (value) => {
        const newDepartment  = {
            id: uuidv4(),
            name: value,
            employees: []
            }

        departments.push(newDepartment) 
    },

    editDepartment: (id, value) => {

        departments.map(department => {
            if (department.id === id) {
                department.name = value
            }
        })

    },

    deleteDepartment: (id) => {
        return departments.filter(department => {
            department.id !== id
        })
    }

}