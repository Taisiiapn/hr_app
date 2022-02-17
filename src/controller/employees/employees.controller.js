const ejs = require('ejs')
const Joi = require('joi');
const logger = require('../../config//logger');
const employeesService = require('../../services/employees.service');
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

    renderEmployees: (departmentid) => new Promise((resolve, reject) => {

        employeesService.getEmployeesWithViewValues(departmentid)
            .then(employees => {
                ejs.renderFile(__dirname + '/../../views/employees/employeesList.ejs',
                    {data: employees, departmentid}
                )
                .then(html => resolve(html))
                .catch(error => reject(error))
            })
            .catch(error => {
                logger.error('renderEmployees controller', error)
                reject(error)
            })
    }),

    renderCreateEmployee: (parameters, departmentId) => new Promise((resolve, reject) => {

        ejs.renderFile(__dirname + '/../../views/employees/createEmployee.ejs',
                {parameters, departmentId}
        )
        .then(html => resolve(html))
        .catch(error => {
            logger.error('renderCreateEmployee controller', error)
            reject(error)
        })
    }),

    renderEditEmployee: (employeeId, departmentId, query) => new Promise((resolve, reject) => {

        const setUpParameters = (id, query) => new Promise((params_resolve, params_reject) => {

            const resultParameters = {}
            const { body, error } = query;
            
            if (error) {
                
                const values = JSON.parse(body)
                resultParameters['values'] = values,
                resultParameters['error'] = error
                
                logger.info(error)
                params_resolve(resultParameters)

            } else {

                employeesService.getEmployeeById(id)
                    .then(employeeValues => {
                        resultParameters['values'] = employeeValues
                        params_resolve(resultParameters) 
                    })
                    .catch(error => {
                        logger.info(error)
                        params_reject(resultParameters)
                    })
            }
        })

        setUpParameters(employeeId, query)
            .then(parameters => {
                ejs.renderFile(__dirname + '/../../views/employees/editEmployee.ejs',
                    {
                        employeeId,
                        departmentId,
                        parameters
                    }
                )
                .then(html => resolve(html))
            })
            .catch(error => {
                logger.error('renderEditEmployee controller', error)
                reject(error)
            })
    }),

    addEmployee: (id, rawValues) => new Promise((resolve, reject) => {

        rawValues.departmentid = id

        const { value, error } = addEmployeeSchema.validate(rawValues)

        if (error) {

            emitEmployeeFailedValidation(error.details[0].message)
            logger.info(error)
            resolve(new Error(`${error}`))
            
        } else {
        
            employeesService.isTheSameEmailExists(value)
                .then(resultTotal => {
                    if (resultTotal !== 0) {
                        // if validation failed
                        resolve(new Error(`Employee's email "${value.email} is used"`))
                        emitEmployeeFailedValidation('Add employee: email is used')
                        logger.info('Add employee: email is used')
                    } else {
                        // if validation pass
                        employeesService.addEmployee(value)
                            .then(() => resolve())
                            .catch(error => {
                                reject(error)
                                logger.error(error)
                            })
                    }
                })
                .catch(error => {
                    logger.error('addEmployee controller', error)
                    reject(error)
                })
        }
    }),

    editEmployee: (employeeId, rawValues) => new Promise((resolve, reject) => {

            const { value, error } = editEmployeeSchema.validate(rawValues)

            if (error) {

                emitEmployeeFailedValidation(error.details[0].message)
                logger.info(error)
                resolve(new Error(`${error}`))

            }  else {

                employeesService.isTheSameEmailExistsWithDifferentId(employeeId, value)
                    .then(resultTotal => {
                        if (resultTotal !== 0) {
                            // if validation failed
                            resolve(new Error(`Employee's email "${value.email} is used"`))
                            emitEmployeeFailedValidation('Edit employee: email is used')
                            logger.info('Edit employee: email is used')
                        } else {
                            // if validation pass
                            employeesService.editEmployee(employeeId, value)
                                .then(result => resolve(result))
                                .catch(error => {
                                    logger.info(error)
                                    reject(error)
                                })
                        }
                    })
                    .catch(error => {
                        logger.error('editEmployee controller', error)
                        reject(error)
                    })
            }
    }),

    deleteEmployee: (employeeId) => new Promise( (resolve, reject) => {

        employeesService.deleteEmployee(employeeId)
            .then(() => resolve()) 
            .catch(error => {
                logger.error(error)
                reject(error)
            })
    })

}