const ejs = require('ejs')
const departmentsModel = require('../../model/departments.model');
const { parseBodyStringToObj } = require('../utils');

module.exports = {
    renderDepartments: (cb) => {

        departmentsModel.getAllDepartments((error, departments) => {
            if (error) {
                cb(error)
            } else {
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
            }
        })
        
    },

    renderCreateDepartment: (parameters, cb) => {

        ejs.renderFile(__dirname + '/../../views/departments/createDepartment.ejs',
                {parameters},
                function (err, html) {
                    if (err) {
                        cb(err)
                        console.log('err debugging', err);
                    } else {
                        cb(null, html)
                    }
                }
        )

    },

    renderEditDepartment: (id, parsedQuery, cb) => {
    

        function setUpParameters(id, query, paramsCB) {

            const { body, error } = query;
            const values = JSON.parse(body)

            const resultParameters = {}

            if (error) {
                
                resultParameters['values'] = values,
                resultParameters['error'] = error
                
                paramsCB(null, resultParameters)

            } else {
                
                // todo get actual dep name and pass to result params
                departmentsModel.getDepartmentById(id, (error, rows) => {
                    if (error) {
                        paramsCB(error)
                    } else {
                        const resultValues = {
                            name: rows[0]['name']
                        }
                        resultParameters['values'] = resultValues
                        paramsCB(null, resultParameters)
                    }
                })
            }
        }

        setUpParameters(id, parsedQuery, (setUpError, parameters) => {
            
            if (setUpError) {
                cb(setUpError)
            } else {

                ejs.renderFile(__dirname + '/../../views/departments/editDepartment.ejs',
                {
                    id,
                    parameters
                },
                function (err, html) {
                    if (err) {
                        cb(err)
                        console.log('err debugging', err);
                    } else {
                        cb(null, html)
                    }
                }
                )
            }
        })
    },

    addDepartment: (body, cb) => {

        const values = parseBodyStringToObj(body)

        // todo validation:

        // - dep name required
        const { name } = values
        if (!name || !name.trim()) {
            cb(null, new Error('Department name is required'))
        } else {
        // - unique dep name (async)

            departmentsModel.isTheSameDepartmentNameExists(values, (isTheSame_error, isExists) => {
                if (isTheSame_error) {
                    cb(isTheSame_error)
                } else {
                    if (isExists) {
                        // if validation failed
                        cb(null, new Error(`Department name "${values.name}" is used`))
                    } else {
                        // if validation pass
                        departmentsModel.addDepartment(values, (error) => {
                            if (error) {
                                cb(error)
                            } else {
                                cb(null)
                            }
                        })
                    }
                }
            })
        }
         
    },

    editDepartment: (id, body, cb) => {

        const values = parseBodyStringToObj(body)
        // const values = JSON.parse(body)
        const { name } = values

        if (!name || !name.trim()) {
            return cb(null, new Error('Department name is required'));
        }

        departmentsModel.isTheSameDepartmentNameExists(values, (isTheSame_error, isExists) => {
            if (isTheSame_error) {
                cb(isTheSame_error)
            } else {
                if (isExists) {
                    // if validation failed
                    cb(null, new Error(`Department name "${values.name}" is used`))
                } else {
                    // if validation pass
                    departmentsModel.editDepartment(id, values, (error) => {
                        if (error) {
                            cb(error)
                        } else {
                            cb(null)
                        }
                    })
                }
            }
        })

    },

    deleteDepartment: (id, cb) => {

        departmentsModel.deleteDepartment(id, (error) => {
            if (error) {
                cb(error)
            } else {
                cb(null)
            }
        })
    }

}