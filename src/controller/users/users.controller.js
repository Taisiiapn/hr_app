const ejs = require('ejs')
const Joi = require('joi');
const { logger } = require('../../config//logger');
const employeesService = require('../../services/user.service');
const { emitEmployeeFailedValidation } = require('../../services/eventEmitter.service');
const { dateStrRegExp, ageRequirementCheck, validDateCheck } = require('../utils')
const bcrypt = require('bcryptjs')

const addUserSchema = Joi.object({
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

const editUserSchema = Joi.object({
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

    renderLogin: (query) => {

        const setUpParams = (query) => {
            const result = {}
            const { body, error } = query

            if (error) {
                const values = JSON.parse(body)
                result['values'] = values
                result['error'] = error
                logger.info(error)
            }

            return result
        }

        const parameters = setUpParams(query)

        return ejs.renderFile(
            __dirname + '/../../views/login.ejs',
            {parameters}
        )
    },

    renderEmployees: async (departmentid) => {

        const employees = await employeesService.getUsersWithViewValues(departmentid)
        return ejs.renderFile(
            __dirname + '/../../views/employees/employeesList.ejs',
            {data: employees, departmentid}
        )
    },

    renderCreateEmployee: (query, departmentId) => {

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

        return ejs.renderFile(
            __dirname + '/../../views/employees/createEmployee.ejs',
            {parameters, departmentId}
        )
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

                const employeeValues = await employeesService.getUserById(id)
                resultParameters['values'] = employeeValues
                return resultParameters   
            }
        }

        const parameters = await setUpParameters(employeeId, query)
        return ejs.renderFile(
            __dirname + '/../../views/employees/editEmployee.ejs',
            {
                employeeId,
                departmentId,
                parameters
            }
        )
    },

    login: async (body) => {

        const { email, password } = body
        let user

        //const hashPassword = await bcrypt.hash(password, 10)

        try {
            user = await employeesService.getUserByEmailAuth(email)
        } catch (error) {
            if (error.status === 400) {
                return error
            } else {
                throw error
            }
        }

        const hashPassword = user.password
        const departmentId = user.departmentid
        const userId = user.id
        const isValidPassword = await bcrypt.compareSync(password, hashPassword)

        if (isValidPassword) {
            return {
                userId,
                departmentId
            }
        } else {
            logger.info("Password is invalid")
            return new Error("Password is invalid")
        }

        //await employeesService.addUser(body)
    },

    addEmployee: async (id, rawValues) => {

        rawValues.departmentid = id

        const { value, error } = addUserSchema.validate(rawValues)

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
                await employeesService.addUser(value)
            }
        }
    },

    editEmployee: async (employeeId, rawValues) => {

        const { value, error } = editUserSchema.validate(rawValues)

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
                await employeesService.editUser(employeeId, value)
                
            }
        }
    },

    deleteEmployee: async (employeeId) => {

        await employeesService.deleteEmployee(employeeId)
            
    }

}