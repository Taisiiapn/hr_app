const ejs = require('ejs')
const Joi = require('joi');
const logger = require('../../config/logger');
const employeesModel = require('../../services/employees.service');
const { emitEmployeeFailedValidation } = require('../../services/eventEmitter.service');
const { dateStrRegExp, ageRequirementCheck, validDateCheck } = require('../utils')

const addEmployeeSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required(),

    salary: Joi.number(),

    birthday: Joi.string()
        .pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy')
        .custom( validDateCheck)
        .message('Invalid date')
        .custom( ageRequirementCheck)
        .message('Age required to be 18 - 75 years range'),
    
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

    departmentid: Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    })
    
}).unknown()

const editEmployeeSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required(),

    salary: Joi.number(),

    birthday: Joi.string()
        .pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy')
        .custom( validDateCheck, 'Valid date check')
        .message('Invalid date')
        .custom( ageRequirementCheck, 'Age requirement')
        .message('Age required to be 18 - 75 years range'),
    
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
    
}).unknown()


module.exports = {

    renderEmployees: (departmentid, cb) => {

        try {

            employeesModel.getEmployeesByDepartmentId(departmentid, (error, employees) => {
                if (error) {
                    cb(error)
                    logger.error(error)
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
                        function (error, html) {
                            if (error) {
                                cb(error)
                                logger.error('err renderEmployees', error);
                            } else {
                                cb( null, html)
                            }
                        }
                    )
                }
            })

        } catch(error) {
            cb(new Error('Internal server Error'))
            logger.error(error)
        }
    },

    renderCreateEmployee: (parameters, departmentId, cb) => {

        try {

            ejs.renderFile(__dirname + '/../../views/employees/createEmployee.ejs',
                    {parameters, departmentId},
                    function (error, html) {
                        if (error) {
                            cb(error)
                            logger.error(error)
                        } else {
                            cb(null, html)
                        }
                    }
            )

        } catch(error) {
            cb(new Error('Internal server Error'))
        }

    },

    renderEditEmployee: (employeeId, departmentId, query, cb) => {

        try {
    

            function setUpParameters(id, query, paramsCB) {

                const resultParameters = {}
                const { body, error } = query;
                
                if (error) {
                    
                    const values = JSON.parse(body)
                    resultParameters['values'] = values,
                    resultParameters['error'] = error
                    
                    paramsCB(null, resultParameters)

                    logger.info(error)

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

            setUpParameters(employeeId, query, (setUpError, parameters) => {
                
                if (setUpError) {
                    cb(setUpError)
                    logger.info(setUpError)
                } else {

                    ejs.renderFile(__dirname + '/../../views/employees/editEmployee.ejs',
                    {
                        employeeId,
                        departmentId,
                        parameters
                    },
                    function (error, html) {
                        if (error) {
                            cb(error)
                            logger.error(error)
                        } else {
                            cb(null, html)
                        }
                    }
                    )
                }
            })

        } catch(error) {
            cb(new Error('Internal server Error'))
            logger.error(error)
        }
    },

    addEmployee: (id, rawValues, cb) => {

        try {

            rawValues.departmentid = id

            const { value, error } = addEmployeeSchema.validate(rawValues)

            if (error) {

                emitEmployeeFailedValidation(error.details[0].message)

                cb(null, new Error(`${error}`));

                logger.error(error)
                
            } else {
            
                employeesModel.isTheSameEmailExists(value, (isExistEmailError, isExist) => {
                    if (isExistEmailError) {
                        cb(isExistEmailError)
                    } else {
                        if (isExist) {
                            // if validation failed
                            cb(null, new Error(`Employee's email "${value.email} is used"`))
                            emitEmployeeFailedValidation('Add employee: email is used')
                            logger.info('Add employee: email is used')
                        } else {
                            // if validation pass
                            employeesModel.addEmployee(value, (error) => {
                                if (error) {
                                    cb(error)
                                    logger.error(error)
                                } else {
                                    cb(null)
                                }
                            })
                        }
                    }
                })
            
            }
        } catch(error) {
            cb(new Error('Internal server Error'))
            logger.error(error)
        }
    },

    editEmployee: (employeeId, rawValues, cb) => {

        try {

            const { value, error } = editEmployeeSchema.validate(rawValues)

            if (error) {

                emitEmployeeFailedValidation(error.details[0].message)
                logger.info(error)
                return cb(null, new Error(`${error}`))

            }  else {

                employeesModel.isTheSameEmailExistsWithDifferentId(employeeId, value, (isExistEmailError, isExist) => {
                    if (isExistEmailError) {
                        cb(isExistEmailError)
                    } else {
                        if (isExist) {
                            // if validation failed
                            
                            cb(null, new Error(`Employee's email "${value.email} is used"`))
                            emitEmployeeFailedValidation('Edit employee: email is used')
                            logger.info('Edit employee: email is used')
                        } else {
                            // if validation pass
                            employeesModel.editEmployee(employeeId, value, (error) => {
                                if (error) {
                                    cb(error)
                                    logger.error('editEmployee controller', error)
                                } else {
                                    cb(null)
                                }
                            })
                        }
                    }
                })
            }

            
        } catch(error) {
            cb(new Error('Internal server Error'))
            logger.error('editEmployee controller (catch)', error)
        }

    },

    deleteEmployee: (employeeId, cb) => {

        try {

            employeesModel.deleteEmployee(employeeId, (error) => {
                if (error) {
                    cb(error)
                    logger.error(error)
                } else {
                    cb(null)
                }
            })


        } catch(error) {
            cb(new Error('Internal server Error'))
        }
    }

}