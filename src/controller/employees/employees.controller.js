const ejs = require('ejs')
const Joi = require('joi');
const { logger } = require('../../config//logger');
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

    renderEmployees: async (departmentid) => {

        const employees = await employeesService.getEmployeesWithViewValues(departmentid)
        const html = await ejs.renderFile(
            __dirname + '/../../views/employees/employeesList.ejs',
            {data: employees, departmentid}
        )
        return html
    },

    renderCreateEmployee: async (query, departmentId) => {

        const setUpParameters = (query) => {

            const resultParameters = {}
            const { body, error } = query
            
            if (error) {
                
                const values = JSON.parse(body)
                resultParameters['values'] = values,
                resultParameters['error'] = error
                
                logger.info(error)
            }
            
            return resultParameters
        }

        const parameters = setUpParameters(query)

        const html = await ejs.renderFile(
            __dirname + '/../../views/employees/createEmployee.ejs',
            {parameters, departmentId}
        )
        return html
    },

    renderEditEmployee: async (employeeId, departmentId, query) => {

        const setUpParameters = async (id, query) => {

            const resultParameters = {}
            const { body, error } = query
            
            if (error) {
                
                const values = JSON.parse(body)
                resultParameters['values'] = values,
                resultParameters['error'] = error
                
                logger.info(error)
                return resultParameters

            } else {

                const employeeValues = await employeesService.getEmployeeById(id)
                resultParameters['values'] = employeeValues
                return resultParameters   
            }
        }

        const parameters = await setUpParameters(employeeId, query)
        const html = await ejs.renderFile(
            __dirname + '/../../views/employees/editEmployee.ejs',
            {
                employeeId,
                departmentId,
                parameters
            }
        )
        return html
    },

    addEmployee: async (id, rawValues) => {

        rawValues.departmentid = id

        const { value, error } = addEmployeeSchema.validate(rawValues)

        if (error) {

            emitEmployeeFailedValidation(error.details[0].message)
            logger.info(error)
            return new Error(`${error}`)
            
        } else {
        
            const resultTotal = await employeesService.isTheSameEmailExists(value)
            if (resultTotal !== 0) {
                // if validation failed
                emitEmployeeFailedValidation('Add employee: email is used')
                logger.info('Add employee: email is used')
                return new Error(`Employee's email "${value.email} is used"`)
            } else {
                // if validation pass
                await employeesService.addEmployee(value)
            }
        }
    },

    editEmployee: async (employeeId, rawValues) => {

        const { value, error } = editEmployeeSchema.validate(rawValues)

        if (error) {

            emitEmployeeFailedValidation(error.details[0].message)
            logger.info(error)
            return new Error(`${error}`)

        }  else {

            const resultTotal = await employeesService.isTheSameEmailExistsWithDifferentId(employeeId, value)
            if (resultTotal !== 0) {
                // if validation failed
                emitEmployeeFailedValidation('Edit employee: email is used')
                logger.info('Edit employee: email is used')
                return new Error(`Employee's email "${value.email} is used"`)
            } else {
                // if validation pass
                await employeesService.editEmployee(employeeId, value)
                
            }
        }
    },

    deleteEmployee: async (employeeId) => {

        await employeesService.deleteEmployee(employeeId)
            
    }

}