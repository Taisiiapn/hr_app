const departmentsService = require("../../../services/departments.service");
const {logger} = require("../../../config/logger");
const {emitDepartmentFailedValidation} = require("../../../services/eventEmitter.service");
const Joi = require("joi");
const { ValidationError, dateStrRegExp, 
    validDateCheck, ageRequirementCheck,
    joiErrorDetailsToErrorObjDTO, 
    singleErrorToErrorObjDTO
} = require("../../utils");
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

/*const addEmployeeSchema = Joi.object({
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

}).unknown()*/




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

            const errorObj = joiErrorDetailsToErrorObjDTO(error.details)
            const errorObjJSON = JSON.stringify(errorObj)

            logger.info('addDepartmentFailedValidation', errorObjJSON)
            emitDepartmentFailedValidation(errorObjJSON)
            throw new ValidationError(errorObjJSON)

        } else {

            const result = await departmentsService.isTheSameDepartmentNameExists(value)
            if (result !== 0) {
                // if validation failed

                const errorObj = singleErrorToErrorObjDTO('name', `Department name "${value.name}" is used`)
                const errorObjJSON = JSON.stringify(errorObj)

                logger.info('addDepartmentFailedValidation', errorObjJSON)
                emitDepartmentFailedValidation(errorObjJSON)
                throw new ValidationError(errorObjJSON)
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

/*const addEmployee = async (req, res, next) => {

    try {

        const { departmentId } = req.params
        const body = req.body

        const { value, error } = addEmployeeSchema.validate(body)

        if (error) {

            const errorObjJSON = JSON.stringify(
                joiErrorDetailsToErrorObjDTO(error.details)
            )

            logger.info('DepartmentFailedValidation', errorObjJSON)
            emitDepartmentFailedValidation(errorObjJSON)
            throw new ValidationError(errorObjJSON)

        } else {

            const result = await usersService.isTheSameEmailExists(value)
            if (result !== 0) {
                // if validation failed

                const errorObjJSON = JSON.stringify(
                    singleErrorToErrorObjDTO('email', `${value.email} is used`)
                )

                logger.info('addEmployeeFailedValidation', errorObjJSON)
                emitDepartmentFailedValidation(errorObjJSON)
                throw new ValidationError(errorObjJSON)
            } else {
                // if validation pass // ?????
                const { id } = await usersService.addUser({
                    ...value,
                    role: ROLE_EMPLOYEE,
                    departmentid: departmentId  // value ????
                })
                const user = await usersService.getUserById(id)
                res.send(user)
            }
        }

    } catch (error) {
        next(error)
    }
}*/

const editDepartment = async (req, res, next) => {

    try {

        const body = req.body
        const { id } = req.params
        const { value, error } = editDepartmentSchema.validate(body)

        if (error) {

            const errorObjJSON = JSON.stringify(
                joiErrorDetailsToErrorObjDTO(error.details)
            )

            logger.info('editDepartmentFailedValidation', errorObjJSON)
            emitDepartmentFailedValidation(errorObjJSON)
            throw new ValidationError(errorObjJSON)

        } else {

            // check department exists 
            await departmentsService.getDepartmentById(id)

            const result = await departmentsService.isTheSameDepartmentNameExists(value)

            if (result !== 0) {
                // if validation failed

                const errorObjJSON = JSON.stringify(
                    singleErrorToErrorObjDTO('name', `Department name "${value.name}" is used`)    
                ) 

                logger.info('editDepartmentFailedValidation', errorObjJSON)
                emitDepartmentFailedValidation(errorObjJSON)
                throw new ValidationError(errorObjJSON)
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
    //addEmployee,
    editDepartment,
    deleteDepartment

}