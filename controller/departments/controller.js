const departments = require('../../index.js')
const ejs = require('ejs')

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

    // todo renderEditDepartment

    addDepartment: () => {
        // const newDepartment  = {
        //     id: uuidv4(),
        //     name: `Department`,
        //     employees: []
        //     }

        // departments.push(newDepartment) 
    },

    editDepartment: (id, values, cb) => {

        const { name } = values

        // todo edit dep by id and values
        // todo return this.renderDepartments  with updated data
    },

    // todo deleteDepartment

}