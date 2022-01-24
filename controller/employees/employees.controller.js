const ejs = require('ejs')
const employeesModel = require('../../model/employees.model')
const { parseBodyStringToObj, validateEmailFormat, 
    validateDateStrFormat, validateDate, 
    validateSalaryFormat, validateBirthday } = require('../utils')

module.exports = {

    renderEmployees: (departmentid, cb) => {

        try {

            employeesModel.getEmployeesByDepartmentId(departmentid, (error, employees) => {
                if (error) {
                    cb(error)
                } else {

                    const mutatedEmployeesForEachDepartment = employees.map(employee => {
                        return {
                            name: employee.name,
                            salary: employee.salary,
                            birthday: employee.birthday,
                            email: employee.email,
                            id: employee.id,
                            updateLink: `/departments/${employee.departmentid}/employees/${employee.id}/update`,
                            deleteLink: `/departments/${employee.departmentid}/employees/${employee.id}/delete`
                        }
                    })

                    ejs.renderFile(__dirname + '/../../views/employees/employeesList.ejs',
                        {data: mutatedEmployeesForEachDepartment, departmentid}, 
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

        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    renderCreateEmployee: (parameters, departmentId, cb) => {

        try {

            ejs.renderFile(__dirname + '/../../views/employees/createEmployee.ejs',
                    {parameters, departmentId},
                    function (err, html) {
                        if (err) {
                            cb(err)
                            console.error('err debugging', err);
                        } else {
                            cb(null, html)
                        }
                    }
            )

        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }

    },

    renderEditEmployee: (employeeId, departmentId, parsedQuery, cb) => {

        try {
    

            function setUpParameters(id, query, paramsCB) {

                const resultParameters = {}
                const { body, error } = query;
                
                if (error) {
                    
                    const values = JSON.parse(body)
                    resultParameters['values'] = values,
                    resultParameters['error'] = error
                    
                    paramsCB(null, resultParameters)

                } else {

                    employeesModel.getEmployeeById(id, (error, rows) => {
                        if (error) {
                            paramsCB(error)
                        } else {
                            const resultValues = {
                                name: rows[0]['name'],
                                salary: rows[0]['salary'],
                                birthday: rows[0]['birthday'],
                                email: rows[0]['email']
                            }
                            resultParameters['values'] = resultValues
                            paramsCB(null, resultParameters)
                        }
                    })
                }
            }

            setUpParameters(employeeId, parsedQuery, (setUpError, parameters) => {
                
                if (setUpError) {
                    cb(setUpError)
                } else {

                    ejs.renderFile(__dirname + '/../../views/employees/editEmployee.ejs',
                    {
                        employeeId,
                        departmentId,
                        parameters
                    },
                    function (err, html) {
                        if (err) {
                            cb(err)
                        } else {
                            cb(null, html)
                        }
                    }
                    )
                }
            })

        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    addEmployee: (id, body, cb) => {

        try {

            const values = parseBodyStringToObj(body)
            const { name, salary, birthday, email } = values
            values.departmentid = id

            const isValidEmailFormat = validateEmailFormat(email)
            const isValidateSalaryFormat = validateSalaryFormat(salary)

            if (!name || !email) {

                return cb(null, new Error('Name and Email are required'))
            }
            
            if (!isValidEmailFormat) {

                return cb(null, new Error('Email is not valid'))

            }

            if (!isValidateSalaryFormat) {

                return cb(null, new Error('Salary is not valid'))

            }

            if (birthday !== null) {

                const isValidDateFormat = validateDateStrFormat(birthday)
            
                if (!isValidDateFormat) {

                    return cb(null, new Error('Date is not valid, dd.mm.yyyy format expected'))

                } else {
                    const isValidDate = validateDate(birthday) 
                    const isValidBirtday = validateBirthday(birthday) 

                    if (!isValidDate) {
                        return cb(null, new Error('Date is not valid'))
                    } 

                    if (!isValidBirtday) {
                        return cb(null, new Error('Age must be in 18-75 years range'))
                    }
                }
            }

            employeesModel.isTheSameEmailExists(values, (isExistEmailError, isExist) => {
                if (isExistEmailError) {
                    cb(isExistEmailError)
                } else {
                    if (isExist) {
                        // if validation failed
                        cb(null, new Error(`Employee's email "${values.email} is used"`))
                    } else {
                        // if validation pass
                        employeesModel.addEmployee(values, (error) => {
                            if (error) {
                                cb(error)
                            } else {
                                cb(null)
                            }
                        })
                    }
                }
            })

            

        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    editEmployee: (employeeId, body, cb) => {

        try {

            const values = parseBodyStringToObj(body)
            const { name, salary, email, birthday } = values

            const isValidateEmailFormat = validateEmailFormat(email)
            const isValidateSalaryFormat = validateSalaryFormat(salary)

            if (!name || !email) {
                return cb(null, new Error('Name and Email are required'));
            }

            if (!isValidateEmailFormat) {

                return cb(null, new Error('Email is not valid'))

            }

            if (!isValidateSalaryFormat) {

                return cb(null, new Error('Salary is not valid'))

            }

            if (birthday !== null) {

                const isValidDateFormat = validateDateStrFormat(birthday)
            
                if (!isValidDateFormat) {

                    return cb(null, new Error('Date is not valid, dd.mm.yyyy format expected'))

                } else {
                    const isValidDate = validateDate(birthday) 
                    const isValidBirtday = validateBirthday(birthday) 

                    if (!isValidDate) {
                        return cb(null, new Error('Date is not valid'))
                    } 

                    if (!isValidBirtday) {
                        return cb(null, new Error('Age must be in 18-75 years range'))
                    }
                }
            }

            employeesModel.isTheSameEmailExistsWithDifferentId(employeeId, values, (isExistEmailError, isExist) => {
                if (isExistEmailError) {
                    cb(isExistEmailError)
                } else {
                    if (isExist) {
                        // if validation failed
                        cb(null, new Error(`Employee's email "${values.email} is used"`))
                    } else {
                        // if validation pass
                        employeesModel.editEmployee(employeeId, values, (error) => {
                            if (error) {
                                cb(error)
                            } else {
                                cb(null)
                            }
                        })
                    }
                }
            })

            
        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }

    },

    deleteEmployee: (employeeId, cb) => {

        try {

            employeesModel.deleteEmployee(employeeId, (error) => {
                if (error) {
                    cb(error)
                } else {
                    cb(null)
                }
            })


        } catch(error) {
            console.error(error)
            cb(new Error('Internal server Error'))
        }
    }
}