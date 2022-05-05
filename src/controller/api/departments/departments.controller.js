const departmentsService = require("../../../services/departments.service");
const {logger} = require("../../../config/logger");
const {emitDepartmentFailedValidation} = require("../../../services/eventEmitter.service");
const Joi = require("joi");
const { BadRequestError, dateStrRegExp, validDateCheck, ageRequirementCheck } = require("../../utils");
const { user_role } = require("../../../config/constants");
const { ROLE_EMPLOYEE, ROLE_ADMIN } = user_role;
const usersService = require("../../../services/user.service");

const addDepartmentSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required()
})

const editDepartmentSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required()
})

const addEmployeeSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
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

}).unknown()



const getDepartments = async (req, res, next) => {

    try {

        const departments = await departmentsService.getAllDepartments()
        res.send(departments)

    } catch (error) {
        next(error)
    }

}

const getDepartmentById = async (req, res, next) => {
    
    try {

        const { departmentId } = req.params
        const { role } = req.user
        let department

        if (role === user_role.ROLE_EMPLOYEE) {
            department = await departmentsService.getDepartmentByIdWithEmployees(departmentId)
        } else {
            department = await departmentsService.getDepartmentByIdWithUsers(departmentId)
        }
    
        res.send(department)

    } catch (error) {
        next(error)
    }

}

const addDepartment = async (req, res, next) => {

    try {

        const body = req.body

        const { value, error } = addDepartmentSchema.validate(body)

        if (error) {

            logger.info(error)
            emitDepartmentFailedValidation(error.details[0].message)
            throw new BadRequestError(`${error}`)

        } else {

            // check department exists 
            await departmentsService.getDepartmentById(id)

            const result = await departmentsService.isTheSameDepartmentNameExists(value)
            if (result !== 0) {
                // if validation failed
                logger.info(`Department name "${value.name}" is used`)
                emitDepartmentFailedValidation('Add department: name is used')
                throw new BadRequestError(`Department name "${value.name}" is used`)
            } else {
                // if validation pass
                const { id } = await departmentsService.addDepartment(value)
                const department = await departmentsService.getDepartmentById(id)
                res.send(department)
            }
        }

    } catch (error) {
        next(error)
    }
}

const addEmployee = async (req, res, next) => {

    try {

        const { departmentId } = req.params
        const body = req.body

        const { value, error } = addEmployeeSchema.validate(body)

        if (error) {

            logger.info(error)
            emitDepartmentFailedValidation(error.details[0].message)
            throw new BadRequestError(`${error}`)

        } else {

            const result = await usersService.isTheSameEmailExists(value)
            if (result !== 0) {
                // if validation failed
                logger.info(`"${value.email}" is used`)
                emitDepartmentFailedValidation('Add employee: email is used')
                throw new BadRequestError(`"${value.email}" is used`)
            } else {
                // if validation pass
                const { id } = await usersService.addUser(value, ROLE_EMPLOYEE, departmentId)
                const user = await usersService.getUserById(id)
                res.send(user)
            }
        }

    } catch (error) {
        next(error)
    }
}

const editDepartment = async (req, res, next) => {

    try {

        const body = req.body
        const { id } = req.params
        const { value, error } = editDepartmentSchema.validate(body)

        if (error) {

            logger.info(error.details[0].message)
            emitDepartmentFailedValidation(error.details[0].message)
            throw new BadRequestError(`${error}`)

        } else {

            // check department exists 
            await departmentsService.getDepartmentById(id)

            const result = await departmentsService.isTheSameDepartmentNameExists(value)

            if (result !== 0) {
                // if validation failed
                logger.info(`Department name "${value.name}" is used`)
                emitDepartmentFailedValidation('Edit department: name is used')
                throw new BadRequestError(`Department name "${value.name}" is used`)
            } else {
                // if validation pass
                await departmentsService.editDepartment(id, value)
                const department = await departmentsService.getDepartmentById(id)
                res.send(department)
            }
        }

    } catch (error) {
        next(error)
    }
}

const deleteDepartment = async (req, res, next) => {

    try {
        const { id } = req.params

        // check department exists 
        await departmentsService.getDepartmentById(id)

        await departmentsService.deleteDepartment(id)
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
    
}

module.exports = {

    getDepartments,
    getDepartmentById,
    addDepartment,
    addEmployee,
    editDepartment,
    deleteDepartment

}